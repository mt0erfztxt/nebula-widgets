(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]))

(def ^:private widgets-routes
  [:widgets/app-panel
   :widgets/button
   :widgets/button-group
   :widgets/button-group-set
   :widgets/card
   :widgets/checkable-input
   :widgets/group-input
   :widgets/checkable-group-input
   :widgets/text-input
   :widgets/text-group-input
   :widgets/form-field
   :widgets/checkable-group-input-form-field])

(def ^:private pages-href-and-text
  (for [route widgets-routes]
    [(routes/resolve route) (name route)]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.homePanel
   [:ul.homePanel-widgetList
    (for [[href text] pages-href-and-text]
      ^{:key text}
      [:li.homePanel-widgetList-item
       [:a {:href href} text]])]])
