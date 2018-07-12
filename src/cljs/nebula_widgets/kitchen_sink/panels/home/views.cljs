(ns nebula-widgets.kitchen-sink.panels.home.views
  (:require
    [nebula-widgets.kitchen-sink.routes :as routes]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.homePanel
   [:ul
    [:li [:a {:href (routes/resolve :widgets/app-panel)} "appPanel widget"]]
    [:li [:a {:href (routes/resolve :widgets/text-input)} "textInput widget"]]]])
