(ns nebula-widgets.widgets.table.re-frame.subs
  (:require
    [re-frame.core :as rf]))

(defn- column-resizing-sub-computation-fn [widget-db-chunk [_ table]]
  (get-in widget-db-chunk [table :column-resizing]))

(defn- width-sub-computation-fn [widget-db-chunk [_ table]]
  (get-in widget-db-chunk [table :width]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn register-subs [sub-namespace]
  (rf/reg-sub sub-namespace (fn [db _] (get db sub-namespace)))
  (doseq [[sub-name sub-handler]
          [[:column-resizing column-resizing-sub-computation-fn]
           [:width width-sub-computation-fn]]]
    (keyword sub-namespace sub-name)
    (rf/reg-sub
      (keyword sub-namespace sub-name)
      (fn [_ _] (rf/subscribe [sub-namespace]))
      sub-handler)))
