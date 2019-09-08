(ns nebula-widgets.widgets.table.re-frame.subs
  (:require
    [re-frame.core :as rf]))

;; TODO: All computation fns are of same pattern -> doseq.
(defn- column-order-sub-computation-fn
  [widget-db [_ table-cid]]
  (get-in widget-db [table-cid :column-order]))

(defn- column-resizing-sub-computation-fn
  [widget-db [_ table-cid]]
  (get-in widget-db [table-cid :column-resizing]))

(defn- column-widths-sub-computation-fn
  [widget-db [_ table-cid]]
  (get-in widget-db [table-cid :column-widths]))

(defn- width-sub-computation-fn
  [widget-db [_ table-cid]]
  (get-in widget-db [table-cid :width]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn register-subs
  "Registers one subscription for widget's whole state and multiple subscriptions for its parts."
  [widget-namespace-key]
  (rf/reg-sub widget-namespace-key (fn [db _] (get db widget-namespace-key)))
  (doseq [[sub-name sub-handler]
          [[:column-order column-order-sub-computation-fn]
           [:column-resizing column-resizing-sub-computation-fn]
           [:column-widths column-widths-sub-computation-fn]
           [:width width-sub-computation-fn]]]
    (rf/reg-sub
      (keyword widget-namespace-key sub-name)
      (fn [_ _] (rf/subscribe [widget-namespace-key]))
      sub-handler)))
