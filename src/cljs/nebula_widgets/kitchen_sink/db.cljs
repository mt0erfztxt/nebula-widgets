(ns nebula-widgets.kitchen-sink.db
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.db :as app-panel-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.button-group-set-widget.db :as button-group-set-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.button-group-widget.db :as button-group-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.button-widget.db :as button-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.card-widget.db :as card-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.db :as checkable-group-input-form-field-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-widget.db :as checkable-group-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.checkable-input-widget.db :as checkable-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.db :as form-field-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.form-widget.db :as form-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.group-input-widget.db :as group-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.text-group-input-form-field-widget.db :as text-group-input-form-field-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.text-group-input-widget.db :as text-group-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.db :as text-input-widget-panel-db]))

(def ^:private db-panels
  (merge
    {}
    app-panel-widget-panel-db/default-db
    button-group-set-widget-panel-db/default-db
    button-group-widget-panel-db/default-db
    button-widget-panel-db/default-db
    card-widget-panel-db/default-db
    checkable-group-input-form-field-widget-panel-db/default-db
    checkable-group-input-widget-panel-db/default-db
    checkable-input-widget-panel-db/default-db
    form-field-widget-panel-db/default-db
    form-widget-panel-db/default-db
    group-input-widget-panel-db/default-db
    text-group-input-form-field-widget-panel-db/default-db
    text-group-input-widget-panel-db/default-db
    text-input-widget-panel-db/default-db))

(def default-db
  {:app {:route {:id :home, :params nil, :query nil}}
   :panels db-panels})
