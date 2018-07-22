(ns nebula-widgets.kitchen-sink.subs
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.subs]
    [nebula-widgets.kitchen-sink.panels.card-widget.subs]
    [nebula-widgets.kitchen-sink.panels.text-input.subs]
    [re-frame.core :as rf]))

(rf/reg-sub
  :app
  (fn [db _]
    (:app db)))

(rf/reg-sub
  :app/route
  :<- [:app]
  (fn [app _]
    (:route app)))

(rf/reg-sub
  :panels
  (fn [db _]
    (:panels db)))

(rf/reg-sub
  :get-panels-text-input
  :<- [:get-panels]
  (fn [panels _]
    (:text-input panels)))
