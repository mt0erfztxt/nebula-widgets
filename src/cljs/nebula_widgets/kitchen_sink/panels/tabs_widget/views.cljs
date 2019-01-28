(ns nebula-widgets.kitchen-sink.panels.tabs-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.tabs-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.tabs.core :as tabs]
    [re-frame.core :as rf]
    [reagent.core :as r]))

(def ^:private icons
  ["angle-double-left" "anchor" "check" "bolt" "bomb" "pencil-alt" "plus" "sync-alt" "eraser" "trash"])

(defn- reduce-number-to-single-digit [n]
  (let [result
        (->>
          (-> n str (str/replace #"[^0-9]" "") seq)
          (map js/parseInt)
          (reduce +))]
    (if (<= result 9) result (recur result))))

(defn- build-button-props [group idx]
  {:group group
   :icon (nth icons (reduce-number-to-single-digit idx))})

(defn- build-buttons-prop
  "Accepts specially formatted string and returns seq of maps suitable to be used as `:buttons` prop of widget.
  Examples of string format:
  - after - one button placed after items
  - before2 - two buttons placed before items
  - end1+start2 - one button placed at start of items list and two buttons placed at end of items list"
  [value]
  (->>
    (str/split value #"\+")
    (map
      (fn [s]
        (let [[_ group cnt :as result] (re-matches #"(after|before|end|start)(\d*)" s)]
          (when result
            (if (seq cnt) (repeat (js/parseFloat cnt) group) group)))))
    (flatten)
    (filter some?)
    (map-indexed #(build-button-props %2 %1))))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->>
    [:active-tab :buttons :items-position]
    (map
      (fn [prop]
        [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
    (into {})))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [buttons items-position] :as props} @*props]
        (into
          [ie/widget
           [tabs/widget
            (->
              props
              (select-keys [:active-tab])
              (merge
                {:buttons (build-buttons-prop buttons)
                 :items
                 {:data
                  (for [i (range 1 4) :let [label (str "Tab" i), cid (str/lower-case label)]]
                    {:content [:div.tabsWidgetPanel-tabContent (str label " content")]
                     :cid cid
                     :label label
                     :on-click (r/partial (:active-tab ie-setters) cid)})
                  :position items-position}}))]]
          (for
            [params
             [[:- "tabs props"]
              [:active-tab (ie-cgi-knob/gen-items "tab1" "tab2" "tab3")]
              [:- "knobs"]
              [:buttons (ie-cgi-knob/gen-items "after" "before2" "end2" "no" "start")]
              [:items-position (ie-cgi-knob/gen-items "end" "start")]]
             :let [[cid label-or-items] (if (sequential? params) params [params])
                   label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change (get ie-setters cid)
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
