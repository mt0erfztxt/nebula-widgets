(ns nebula-widgets.kitchen-sink.panels.text-group-input-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.text-group-input-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [property
        [:disabled :errors :invalid :no-row-gap :size :value]]
  (let [event (common/panel-path->keyword :interactive-example "/" :set property)]
    (rf/reg-event-db event (rf-utils/make-setter-event-handler event))))
