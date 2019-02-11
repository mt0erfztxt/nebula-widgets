(ns nebula-widgets.kitchen-sink.panels.tab-group-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.tab-group-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.tab-group.core :as tab-group]
    [re-frame.core :as rf]
    [reagent.core :as r]))

(def ^:private bem
  "tabGroupWidgetPanel")

(def ^:private ie-container-bem
  (str bem "-ieContainer"))

(def ^:private tab-content-bem
  (str bem "-tabContent"))

(defn- get-button-icon [{:keys [layout sidebar-placement]} idx]
  (case idx
    0 (str
        "angle-double-"
        (cond
          (not= "none" sidebar-placement) sidebar-placement
          (and
            (= "none" sidebar-placement)
            (= "vertical" (name layout)))
          "left"
          :else "up"))
    1 "anchor"
    2 "lock"
    3 "shield"))

(def ^:private tab-icons
  ["pencil" "check" "bolt" "eraser" "plus" "trash"])

(defn- reduce-number-to-single-digit [n]
  (let [result
        (->>
          (-> n str (str/replace #"[^0-9]" "") seq)
          (map js/parseInt)
          (reduce +))]
    (if (<= result 9) result (recur result))))

(defn- build-button-props [{:keys [collapsed] :as ctx} idx]
  (let [icon (get-button-icon ctx (reduce-number-to-single-digit idx))
        toggle-collapse? (= 0 idx)]
    {:active (= 1 idx)
     :cid icon
     :disabled (= 2 idx)
     :icon icon
     :on-click (if toggle-collapse? (:handle-toggle-collapsed-click ctx) identity)
     :rotated (and toggle-collapse? collapsed)}))

(defn- build-button-group-props [ctx buttons-count]
  {:buttons (map (partial build-button-props ctx) (range buttons-count))})

(defn- build-button-groups-prop
  "Accepts specially formatted string and returns seq of maps suitable to be used as `:buttons` prop of widget.
  Examples of string format:
  - after - one button placed after items
  - before2 - two buttons placed before items
  - end1+start2 - one button placed at start of items list and two buttons placed at end of items list"
  [ctx value]
  (let [placement-seq
        (->>
          (str/split value #"\+")
          (map
            (fn [s]
              (let [[_ placement cnt :as result] (re-matches #"(after|before|end|start)(\d*)" s)]
                (when result
                  (if (seq cnt) (repeat (js/parseFloat cnt) placement) placement)))))
          (flatten)
          (filter some?))]
    (when (seq placement-seq)
      (hash-map
        (-> placement-seq first keyword)
        (build-button-group-props ctx (count placement-seq))))))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> common/knobs
    (map
      (fn [knob]
        [(apply utils/path->keyword knob)
         #(rf/dispatch [(apply interactive-example-path->keyword :set knob) %2])]))
    (into {})))

(let [{layout-setter :layout sidebar-placement-setter :sidebar.placement} ie-setters]
  (defn- handle-layout-on-change [*props value _]
    (when (= "none" (-> @*props :sidebar :placement))
      (layout-setter *props value)))

  (defn- handle-sidebar-placement-on-change [*props value _]
    (sidebar-placement-setter *props value)
    (when (not= "none" value)
      (layout-setter *props "vertical"))))

(def ^:private tabs-indexes (range 1 5))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [button-groups collapsed layout sidebar] :as props} @*props
            {sidebar-placement :placement} sidebar
            sidebar? (not= "none" sidebar-placement)
            layout (if sidebar? "vertical" layout)]
        (into
          [ie/widget
           [:div
            {:class
             (bem-utils/build-class
               ie-container-bem
               [["sidebar" sidebar?] ["sidebarPlacement" sidebar-placement]])}
            [tab-group/widget
             (-> props
               (select-keys [:active-tab :alignment :collapsed :layout])
               (merge
                 {:button-groups
                  (build-button-groups-prop
                    {:collapsed collapsed
                     :handle-toggle-collapsed-click (r/partial (:collapsed ie-setters) *props (not collapsed))
                     :layout layout
                     :sidebar-placement sidebar-placement}
                    button-groups)
                  :sidebar (when sidebar? sidebar)
                  :tabs
                  (for [i tabs-indexes
                        :let [label (str "Tab" (apply str (repeat i i)))
                              cid (str "tab" i)]]
                    (merge
                      {:content
                       [:div
                        {:class
                         (bem-utils/build-class
                           tab-content-bem
                           [["layout" layout] ["sidebar" (not= "none" sidebar-placement)]])}
                        (str label " content")]
                       :cid cid
                       :on-click (r/partial (:active-tab ie-setters) *props cid)}
                      (cond
                        sidebar? {:icon (nth tab-icons (-> i dec reduce-number-to-single-digit))}
                        (= 2 i) {:label label, :icon (nth tab-icons (dec i))}
                        (= 4 i) {:icon (nth tab-icons (dec i))}
                        :else {:label label})))}))]]]
          (for
            [params
             [[:- "widget props"]
              [:active-tab (apply ie-cgi-knob/gen-items (map (partial str "tab") tabs-indexes))]
              [:alignment (ie-cgi-knob/gen-items "end" "start")]
              :collapsed
              [:layout (ie-cgi-knob/gen-items "horizontal" "vertical")]
              [:sidebar.panel (ie-cgi-knob/gen-items "normal")]
              [:sidebar.placement (ie-cgi-knob/gen-items "left" "none" "right")]
              [:size (ie-cgi-knob/gen-items "normal")]
              [:- "knobs"]
              [:button-groups (ie-cgi-knob/gen-items "after" "before2" "end4" "no" "start")]]
             :let [[cid label-or-items] (if (sequential? params) params [params])
                   label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change
                (r/partial
                  (condp = cid
                    :layout handle-layout-on-change
                    :sidebar.placement handle-sidebar-placement-on-change
                    (get ie-setters cid))
                  *props)
                :value (get-in props (utils/keyword->path cid))}
               (and (not label?) label-or-items) (assoc :items label-or-items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div {:class bem}
   [man-page/widget
    "# Tab group widget"
    (-> #'tab-group/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
