(ns nebula-widgets.kitchen-sink.panels.radio-input-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.radio-input-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [property [:checked :disabled :invalid :label-shrinked :size :widget]]
  (let [event (common/panel-path->keyword :interactive-example "/" :set property)]
    (rf/reg-event-db event (rf-utils/make-setter-event-handler event))))
