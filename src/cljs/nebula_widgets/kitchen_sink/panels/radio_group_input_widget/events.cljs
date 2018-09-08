(ns nebula-widgets.kitchen-sink.panels.radio-group-input-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.radio-group-input-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Helpers
;;------------------------------------------------------------------------------

;;------------------------------------------------------------------------------
;; Handlers
;;------------------------------------------------------------------------------

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

;; Register events for specified properties. Property can be keyword - then its
;; event handler registered for all examples, or cab be a tuple of property
;; (keyword) and a set of examples (string) for which event handler must be
;; registered.
(doseq [s ["010" "020" "030" "040"] :let [example (str "example" s)]]
  (doseq [property [[:disabled #{"020"}] :value]]
    (let [sparse? (sequential? property)]
      (when (if-let [only-for (when sparse? (second property))] (only-for s) true)
        (let [event (common/panel-path->keyword example "/" :set (if sparse? (first property) property))]
          (rf/reg-event-db event (rf-utils/make-setter-event-handler event)))))))
