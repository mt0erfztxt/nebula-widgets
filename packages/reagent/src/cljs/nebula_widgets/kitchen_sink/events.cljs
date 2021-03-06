(ns nebula-widgets.kitchen-sink.events
  (:require
    [nebula-widgets.kitchen-sink.db :as db]
    [nebula-widgets.kitchen-sink.panels.action-group-widget.events]
    [nebula-widgets.kitchen-sink.panels.action-group-action-widget.events]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.events]
    [nebula-widgets.kitchen-sink.panels.button-group-set-widget.events]
    [nebula-widgets.kitchen-sink.panels.button-group-widget.events]
    [nebula-widgets.kitchen-sink.panels.button-widget.events]
    [nebula-widgets.kitchen-sink.panels.card-widget.events]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.events]
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.checkable-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.events]
    [nebula-widgets.kitchen-sink.panels.form-widget.events]
    [nebula-widgets.kitchen-sink.panels.group-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.tab-group-widget.events]
    [nebula-widgets.kitchen-sink.panels.text-group-input-form-field-widget.events]
    [nebula-widgets.kitchen-sink.panels.text-group-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.toolbar-widget.events]
    [nebula-widgets.kitchen-sink.panels.table-widget.events]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Handlers
;;------------------------------------------------------------------------------

(defn- initialize-app-evt-handler [_ _]
  db/default-db)

(defn- set-app-route-evt-handler [db [_ new-route]]
  (assoc-in db [:app :route] new-route))

;;------------------------------------------------------------------------------
;; Co-effects
;;------------------------------------------------------------------------------

;;------------------------------------------------------------------------------
;; Effects
;;------------------------------------------------------------------------------

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(rf/reg-event-db :app/initialize initialize-app-evt-handler)
(rf/reg-event-db :app/set-route set-app-route-evt-handler)
