(ns nebula-widgets.kitchen-sink.db
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.db :as app-panel-widget-panel-db]
    [nebula-widgets.kitchen-sink.panels.text-input.db :as text-input-panel-db]))

(def ^:private db-panels
  (merge {}
         app-panel-widget-panel-db/default-db
         text-input-panel-db/default-db))

(def default-db
  {:app    {:route {:id :home :params nil :query nil}}
   :panels db-panels})
