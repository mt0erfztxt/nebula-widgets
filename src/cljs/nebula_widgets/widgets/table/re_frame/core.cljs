(ns nebula-widgets.widgets.table.re-frame.core
  (:require
    [nebula-widgets.widgets.table.re-frame.events :as events]
    [nebula-widgets.widgets.table.re-frame.subs :as subs]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn register
  ([] (register :nw-table))
  ([table-namespace]
   (events/register-events table-namespace)
   (subs/register-subs table-namespace)))
