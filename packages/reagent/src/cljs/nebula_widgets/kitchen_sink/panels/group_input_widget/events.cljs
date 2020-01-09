(ns nebula-widgets.kitchen-sink.panels.group-input-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.group-input-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [property
        [:columns :disabled :equidistant :errors :inline :invalid :no-row-gap :size :soft-columns :stacked-on-mobile
         :widget]]
  (let [event (common/panel-path->keyword :interactive-example "/" :set property)]
    (rf/reg-event-db event (rf-utils/make-setter-event-handler event))))
