(ns nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.checkable-group-input-form-field-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [property [:disabled :inline :label :multi-checkable :required :value :widget]]
  (let [event (common/panel-path->keyword :interactive-example "/" :set property)]
    (rf/reg-event-db event (rf-utils/make-setter-event-handler event))))
