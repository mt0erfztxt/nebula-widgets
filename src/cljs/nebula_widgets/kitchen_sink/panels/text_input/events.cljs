(ns nebula-widgets.kitchen-sink.panels.text-input.events
  (:require
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Handlers
;;------------------------------------------------------------------------------

(defn- set-value-evt-handler [db [_ value]]
  (assoc-in db [:panels :text-input :value] value))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(rf/reg-event-db :text-input-panel/set-value set-value-evt-handler)
