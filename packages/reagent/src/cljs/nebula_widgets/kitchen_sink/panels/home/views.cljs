(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]
    [nebula-widgets.widgets.app-panel.core :as app-panel]))

(def ^:private widgets-routes
  [:widgets/action-group
   :widgets/action-group-action
   :widgets/app-panel
   :widgets/button
   :widgets/button-group
   :widgets/button-group-set
   ;:widgets/card ; TODO: Replace (this is old one)
   :widgets/checkable-input
   :widgets/group-input
   :widgets/checkable-group-input
   :widgets/text-input
   :widgets/text-group-input
   :widgets/form-field
   :widgets/checkable-group-input-form-field
   :widgets/text-group-input-form-field
   :widgets/form
   :widgets/tab-group
   :widgets/table
   :widgets/toolbar])

(def ^:private pages-href-and-text
  (for [route widgets-routes]
    [(routes/resolve route) (name route)]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  []
  [app-panel/widget
   {:cid "homePanel"
    :sidebars
    [{:content
      [:div.homePanel
       [:ul.homePanel-widgetList
        (for [[href text] pages-href-and-text]
          ^{:key text}
          [:li.homePanel-widgetList-item
           [:a {:href href} text]])]]}]}])
