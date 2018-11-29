(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]))

(def ^:private widgets-routes
  [:widgets/app-panel
   :widgets/button
   :widgets/button-group
   :widgets/button-group-set
   :widgets/card
   :widgets/checkbox-group-input
   :widgets/checkbox-group-input-item
   :widgets/checkbox-input
   :widgets/form-field
   :widgets/group-input
   :widgets/group-input-item
   :widgets/radio-group-input
   :widgets/radio-group-input-item
   :widgets/radio-input
   :widgets/text-input])

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
