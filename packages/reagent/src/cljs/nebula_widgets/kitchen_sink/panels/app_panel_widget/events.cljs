(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.common :as common]
    [nebula-widgets.utils.re-frame :as rf-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [property common/knobs]
  (let [event (apply common/panel-path->keyword :interactive-example "/" :set property)]
    (rf/reg-event-db event (rf-utils/make-setter-event-handler event))))
