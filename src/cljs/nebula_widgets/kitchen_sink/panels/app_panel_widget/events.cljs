(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.events
  (:require
    [nebula-widgets.kitchen-sink.panels.app-panel-widget.common :as common]
    [nebula-widgets.utils.event :as event-utils]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Helpers
;;------------------------------------------------------------------------------

(defn- make-bar-setter-event-handler [placement property]
  (event-utils/make-setter-event-handler :panels :app-panel-widget :bar (keyword placement) property))

(defn- make-header-setter-event-handler [property]
  (event-utils/make-setter-event-handler :panels :app-panel-widget :header property))

(defn- make-sidebar-setter-event-handler [placement property]
  (event-utils/make-setter-event-handler :panels :app-panel-widget (-> placement name (str "-sidebar") keyword) property))

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

;; header
(doseq [property [:absent? :pinned?]]
  (apply rf/reg-event-db
         ((juxt common/build-header-setter-event-name make-header-setter-event-handler) property)))

;; sidebars
(doseq [placement [:left :right]]
  (doseq [property [:collapsed? :gutter :size]]
    (apply rf/reg-event-db
           ((juxt common/build-sidebar-setter-event-name make-sidebar-setter-event-handler) placement property))))
