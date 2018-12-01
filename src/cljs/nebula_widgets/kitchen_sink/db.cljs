(ns nebula-widgets.kitchen-sink.db
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.db :as app-panel-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.card-widget.db :as card-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.db :as checkbox-group-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.checkbox-input-widget.db :as checkbox-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.db :as form-field-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.radio-group-input-widget.db :as radio-group-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.radio-input-widget.db :as radio-input-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.db :as text-input-widget-panel-db]))

(def ^:private db-panels
  (merge
    {}
    app-panel-widget-panel-db/default-db
    card-widget-panel-db/default-db
    checkbox-group-input-widget-panel-db/default-db
    checkbox-input-widget-panel-db/default-db
    form-field-widget-panel-db/default-db
    radio-group-input-widget-panel-db/default-db
    radio-input-widget-panel-db/default-db
    text-input-widget-panel-db/default-db))

(def default-db
  {:app {:route {:id :home, :params nil, :query nil}}
   :panels db-panels})
