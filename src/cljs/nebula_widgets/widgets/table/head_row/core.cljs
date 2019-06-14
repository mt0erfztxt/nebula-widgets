(ns nebula-widgets.widgets.table.head-row.core
  (:require
    [nebula-widgets.widgets.table.head-row.cell :as cell]))

(def ^:private bem "nw-table-headRow")
(def ^:private default-width 100)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Calculate new width for columns then update table's columns state if any width changed.
(defn widget [{:keys [columns column-resizing on-end-column-resizing on-start-column-resizing]} table-width]
  (let [column-widths-by-cid
        (reduce
          (fn [acc {:keys [cid width]}]
            (assoc acc cid (if (and width (pos? width)) width default-width)))
          {}
          columns)
        total-width (->> column-widths-by-cid vals (reduce +))
        ratio (/ table-width total-width)]
    [:div {:class bem}
     (for [{:keys [cid] :as column}
           (map
             (fn [{:keys [cid] :as column}]
               (assoc column
                 :resizing? (= cid column-resizing)
                 :width (-> column-widths-by-cid (get cid) (* ratio) Math/floor)))
             columns)]
       ^{:key cid} [cell/widget column on-end-column-resizing on-start-column-resizing])]))
