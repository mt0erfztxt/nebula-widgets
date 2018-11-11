(ns nebula-widgets.kitchen-sink.panels.text-input-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.text-input-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [property [:busy :disabled :errors :invalid :multi-line :size :text-alignment :value]]
  (let [event (common/panel-path->keyword :interactive-example "/" :set property)]
    (rf/reg-event-db event (rf-utils/make-setter-event-handler event))))
