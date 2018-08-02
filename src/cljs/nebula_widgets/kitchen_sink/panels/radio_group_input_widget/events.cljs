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

(doseq [s ["010" "020" "030" "040"] :let [example (str "example" s)]]
  (doseq [property [:value]]
    (let [event (common/panel-path->keyword example "/" :set property)]
      (rf/reg-event-db event (rf-utils/make-setter-event-handler event)))))
