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

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:active-tab]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [active-tab] :as props} @*props]
        (into
          [ie/widget
           [tabs/widget
            {:active-tab active-tab
             :items
             {:data
              (for [i (range 1 4) :let [label (str "Tab" i), cid (str/lower-case label)]]
                {:content [:div.tabsWidgetPanel-tabContent (str label " content")]
                 :cid cid
                 :label label
                 :on-click (r/partial (:active-tab ie-setters) cid)})}}]]
          (for [params
                [[:- "tabs props"]]
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
