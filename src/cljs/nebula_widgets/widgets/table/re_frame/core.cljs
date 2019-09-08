(ns nebula-widgets.widgets.table.re-frame.core
  (:require
    [nebula-widgets.widgets.table.re-frame.events :as events]
    [nebula-widgets.widgets.table.re-frame.subs :as subs]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Describe widget's state map.
(defn register
  ([] (register :nw-table))
  ([widget-namespace]
   (let [widget-namespace-key (keyword widget-namespace)]
     (events/register-events widget-namespace-key)
     (subs/register-subs widget-namespace-key))))
