(ns nebula-widgets.widgets.table.body-row.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.table.body-row.cell :as cell]))

(def ^:private bem "nw-table-bodyRow")

(defn- build-class
  [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  [column-order row]
  [:div {:class (build-class row)}
   (->> column-order
     (reduce
       (fn [acc cid]
         (conj acc ^{:key cid} [cell/widget cid (get row cid)]))
       [])
     (seq))])
