(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.homePanel
   [:ul
    [:li [:a {:href (routes/resolve :widgets/app-panel)} "app-panel widget"]]
    [:li [:a {:href (routes/resolve :widgets/card)} "card widget"]]
    [:li [:a {:href (routes/resolve :widgets/radio-group-input)} "radio-group-input widget"]]
    [:li [:a {:href (routes/resolve :widgets/text-input)} "text-input widget"]]]])
