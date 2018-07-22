(ns nebula-widgets.kitchen-sink.panels.card-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.card-widget.common :as common]
    [nebula-widgets.utils.event :as event-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Helpers
;;------------------------------------------------------------------------------

(defn- make-bar-setter-event-handler [placement property]
  (event-utils/make-setter-event-handler :panels :card-widget :bar (keyword placement) property))

;;------------------------------------------------------------------------------
;; Handlers
;;------------------------------------------------------------------------------

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

;; bars
(doseq [placement [:bottom :top]]
  (doseq [property [:separated?]]
    (apply rf/reg-event-db
           ((juxt common/build-bar-setter-event-name make-bar-setter-event-handler) placement property))))
