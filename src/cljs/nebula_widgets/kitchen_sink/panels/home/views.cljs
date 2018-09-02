(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]))

(def ^:private pages-href-and-text
  [[(routes/resolve :widgets/app-panel) "app-panel"]
   [(routes/resolve :widgets/card) "card"]
   [(routes/resolve :widgets/radio-group-input) "radio-group-input"]
   [(routes/resolve :widgets/text-input) "text-input"]])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.homePanel
   (into [:ul.homePanel-widgetList]
         (for [[href text] pages-href-and-text]
           [:li.homePanel-widgetList-item
            [:a {:href href} text]]))])
