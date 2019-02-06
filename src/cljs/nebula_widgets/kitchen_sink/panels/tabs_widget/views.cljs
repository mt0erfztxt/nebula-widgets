(ns nebula-widgets.kitchen-sink.panels.tabs-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.tabs-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.tabs.core :as tabs]
    [re-frame.core :as rf]
    [reagent.core :as r]))

(def ^:private button-icons
  ["angle-double-left" "anchor" "lock" "angle-double-left"])

(def ^:private tab-icons
  ["pencil" "check" "bolt" "eraser" "plus" "trash"])

(defn- reduce-number-to-single-digit [n]
  (let [result
        (->>
          (-> n str (str/replace #"[^0-9]" "") seq)
          (map js/parseInt)
          (reduce +))]
    (if (<= result 9) result (recur result))))

(defn- build-button-props [idx]
  (let [icon (nth button-icons (reduce-number-to-single-digit idx))]
    {:active (= 1 idx)
     :cid (str icon "-" idx)
     :disabled (= 2 idx)
     :icon icon
     :on-click identity
     :rotated (= 3 idx)}))

(defn- build-button-group-props [buttons-count]
  {:buttons (map build-button-props (range buttons-count))})

(defn- build-button-groups-prop
  "Accepts specially formatted string and returns seq of maps suitable to be used as `:buttons` prop of widget.
  Examples of string format:
  - after - one button placed after items
  - before2 - two buttons placed before items
  - end1+start2 - one button placed at start of items list and two buttons placed at end of items list"
  [value]
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
        (build-button-group-props (count placement-seq))))))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:active-tab :button-groups :collapsed :items-position :layout :sidebar]
    (map
      (fn [prop]
        [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
    (into {})))

(let [{layout-setter :layout sidebar-setter :sidebar} ie-setters]
  (defn- handle-sidebar-on-change [value _]
    (sidebar-setter value)
    (when (not= "no" value)
      (layout-setter "vertical"))))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [button-groups items-position layout sidebar] :as props} @*props
            sidebar? (not= "no" sidebar)
            layout (if sidebar? "vertical" layout)]
        (into
          [ie/widget
           [tabs/widget
            (-> props
              (select-keys [:active-tab :collapsed :layout])
              (merge
                {:button-groups (build-button-groups-prop button-groups)
                 :items
                 {:data
                  (for [i (range 1 5)
                        :let [label (str "Tab" (apply str (repeat i i)))
                              cid (str "tab" i)]]
                    (merge
                      {:content
                       [:div {:class (bem-utils/build-class "tabsWidgetPanel-tabContent" [["layout" layout]])}
                        (str label " content")]
                       :cid cid
                       :on-click (r/partial (:active-tab ie-setters) cid)}
                      (cond
                        sidebar? {:icon (nth tab-icons (-> i dec reduce-number-to-single-digit))}
                        (= 2 i) {:label label, :icon (nth tab-icons (dec i))}
                        (= 4 i) {:icon (nth tab-icons (dec i))}
                        :else {:label label})))
                  :position items-position}
                 :sidebar (when sidebar? sidebar)}))]]
          (for
            [params
             [[:- "tabs props"]
              [:active-tab (ie-cgi-knob/gen-items "tab1" "tab2" "tab3")]
              :collapsed
              [:layout (ie-cgi-knob/gen-items "horizontal" "vertical")]
              [:sidebar (ie-cgi-knob/gen-items "no" "normal")]
              [:- "knobs"]
              [:button-groups (ie-cgi-knob/gen-items "after" "before2" "end4" "no" "start")]
              [:items-position (ie-cgi-knob/gen-items "end" "start")]]
             :let [[cid label-or-items] (if (sequential? params) params [params])
                   label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change (if (= :sidebar cid) handle-sidebar-on-change (get ie-setters cid))
                :value (get props cid)}
               (and (not label?) label-or-items) (assoc :items label-or-items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.tabsWidgetPanel
   [man-page/widget
    "# Tabs widget"
    (-> #'tabs/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
