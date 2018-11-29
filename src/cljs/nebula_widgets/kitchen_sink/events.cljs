(ns nebula-widgets.kitchen-sink.events
  (:require
    [nebula-widgets.kitchen-sink.db :as db]
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.events]
    [nebula-widgets.kitchen-sink.panels.card-widget.events]
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-item-widget.events]
    [nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.checkbox-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.form-field-widget.events]
    [nebula-widgets.kitchen-sink.panels.radio-group-input-item-widget.events]
    [nebula-widgets.kitchen-sink.panels.radio-group-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.radio-input-widget.events]
    [nebula-widgets.kitchen-sink.panels.text-input-widget.events]
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
