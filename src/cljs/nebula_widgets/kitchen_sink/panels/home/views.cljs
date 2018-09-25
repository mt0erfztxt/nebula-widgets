(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]))

(def ^:private widgets-routes
  [:widgets/app-panel
   :widgets/button
   :widgets/card
   :widgets/group-input
   :widgets/group-input-item
   :widgets/radio-group-input
   :widgets/radio-group-input-item])

(def ^:private pages-href-and-text
  (for [route widgets-routes]
    [(routes/resolve route) (name route)]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.homePanel
   (into [:ul.homePanel-widgetList]
         (for [[href text] pages-href-and-text]
           [:li.homePanel-widgetList-item
            [:a {:href href} text]]))])
