(ns nebula-widgets.kitchen-sink.subs
  (:require
    [nebula-widgets.kitchen-sink.panels.action-group-widget.subs]
    [nebula-widgets.kitchen-sink.panels.action-group-action-widget.subs]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.subs]
    [nebula-widgets.kitchen-sink.panels.button-group-set-widget.subs]
    [nebula-widgets.kitchen-sink.panels.button-group-widget.subs]
    [nebula-widgets.kitchen-sink.panels.button-widget.subs]
    [nebula-widgets.kitchen-sink.panels.card-widget.subs]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.subs]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-widget.subs]
    [nebula-widgets.kitchen-sink.panels.checkable-input-widget.subs]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.subs]
    [nebula-widgets.kitchen-sink.panels.form-widget.subs]
    [nebula-widgets.kitchen-sink.panels.group-input-widget.subs]
    [nebula-widgets.kitchen-sink.panels.tab-group-widget.subs]
    [nebula-widgets.kitchen-sink.panels.text-group-input-form-field-widget.subs]
    [nebula-widgets.kitchen-sink.panels.text-group-input-widget.subs]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.subs]
    [nebula-widgets.kitchen-sink.panels.table-widget.subs]
    [nebula-widgets.kitchen-sink.panels.toolbar-widget.subs]
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
