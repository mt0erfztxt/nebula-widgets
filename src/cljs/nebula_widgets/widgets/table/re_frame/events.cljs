(ns nebula-widgets.widgets.table.re-frame.events
  (:require
    [re-frame.core :as rf]))

(defn- make-end-column-resizing-event-handler [db-key]
  (fn end-column-resizing-event-handler [db [_ table]]
    (assoc-in db [db-key table :column-resizing] nil)))

(defn- make-start-column-resizing-event-handler [db-key]
  (fn start-column-resizing-event-handler [db [_ table column-id]]
    (assoc-in db [db-key table :column-resizing] column-id)))

(defn- make-set-width-event-handler [db-key]
  (fn set-width-event-handler [db [_ table width]]
    (assoc-in db [db-key table :width] width)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn register-events [event-namespace]
  (doseq [[event make-event-handler]
          [[:end-column-resizing make-end-column-resizing-event-handler]
           [:start-column-resizing make-start-column-resizing-event-handler]
           [:set-width make-set-width-event-handler]]]
    (rf/reg-event-db
      (keyword event-namespace event)
      (make-event-handler event-namespace))))
