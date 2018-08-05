(ns nebula-widgets.kitchen-sink.views
  (:require
    [nebula-widgets.kitchen-sink.panels.home.views :as home-panel-views]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.views :as app-panel-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.card-widget.views :as card-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.radio-group-input-widget.views :as radio-group-input-widget-panel-views]
    [nebula-widgets.kitchen-sink.panels.text-input.views :as text-input-panel-views]
    [re-frame.core :as rf]
    [reagent.core :as r]))

(defn- root-view []
  (let [*route (rf/subscribe [:app/route])]
    (fn []
      (case (:id @*route)
        :home [home-panel-views/widget]
        :widgets/app-panel [app-panel-widget-panel-views/widget]
        :widgets/card [card-widget-panel-views/widget]
        :widgets/radio-group-input [radio-group-input-widget-panel-views/widget]
        :widgets/text-input [text-input-panel-views/widget]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn mount-root-view []
  (->> (js/document.getElementById "app")
       (r/render [root-view])))