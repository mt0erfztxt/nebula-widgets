(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.subs
  (:require
    [re-frame.core :as rf]))

(rf/reg-sub
  :app-panel-widget-panel
  :<- [:panels]
  (fn [panels _]
    (:app-panel-widget panels)))

(rf/reg-sub
  :app-panel-widget-panel/left-sidebar
  :<- [:app-panel-widget-panel]
  (fn [panel _]
    (:left-sidebar panel)))

(rf/reg-sub
  :app-panel-widget-panel/right-sidebar
  :<- [:app-panel-widget-panel]
  (fn [panel _]
    (:right-sidebar panel)))
