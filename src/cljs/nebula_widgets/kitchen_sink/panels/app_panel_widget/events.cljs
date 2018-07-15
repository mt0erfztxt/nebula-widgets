(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.common :as common]
    [nebula-widgets.utils.event :as event-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Helpers
;;------------------------------------------------------------------------------

(defn- make-sidebar-setter-event-handler [placement property]
  (event-utils/make-setter-event-handler :panels :app-panel-widget (-> placement name (str "-sidebar") keyword) property))

;;------------------------------------------------------------------------------
;; Handlers
;;------------------------------------------------------------------------------

;;------------------------------------------------------------------------------
;; Events
;;------------------------------------------------------------------------------

(doseq [placement [:left :right]]
  (doseq [property [:collapsed? :gutter :size]]
    (apply rf/reg-event-db
           ((juxt common/build-sidebar-setter-event-name make-sidebar-setter-event-handler) placement property))))
