(ns nebula-widgets.widgets.table.re-frame.events
  (:require
    [re-frame.core :as rf]))

(def ^:private default-width 100)

(defn- make-end-column-resizing-event-handler
  [widget-db-key]
  (fn end-column-resizing-event-handler [db [_ table-key column-cid new-column-width]]
    (let [table-db (get-in db [widget-db-key table-key])
          column-order (get table-db :column-order)
          old-column-widths (get table-db :column-widths)
          affected-column-cid (->> column-order (drop-while #(not= column-cid %)) second)
          [old-column-width affected-column-width] (map #(get old-column-widths %) [column-cid affected-column-cid])
          column-width-delta (- old-column-width new-column-width)
          new-column-widths
          (assoc
            old-column-widths
            column-cid new-column-width
            affected-column-cid (+ affected-column-width column-width-delta))]
      (-> db
        (assoc-in [widget-db-key table-key :column-resizing] nil)
        (cond->
          (not (zero? column-width-delta))
          (assoc-in [widget-db-key table-key :column-widths] new-column-widths))))))

(defn- make-start-column-resizing-event-handler
  [widget-db-key]
  (fn start-column-resizing-event-handler [db [_ table-key column-cid]]
    (assoc-in db [widget-db-key table-key :column-resizing] column-cid)))

(defn- make-set-width-event-handler
  [widget-db-key]
  (fn set-width-event-handler [db [_ table-key new-table-width]]
    (let [table-db (get-in db [widget-db-key table-key])
          old-column-widths (get table-db :column-widths)
          column-widths-with-defaults-applied
          (reduce
            (fn [acc cid]
              (let [width (get old-column-widths cid)]
                (assoc acc cid (if (and width (pos? width)) width default-width))))
            {}
            (get table-db :column-order))
          implicit-old-table-width (->> column-widths-with-defaults-applied vals (reduce +))
          ratio (/ new-table-width implicit-old-table-width)
          new-column-widths
          (reduce
            (fn [acc [cid width]]
              (assoc acc cid (-> width (* ratio) Math/floor)))
            {}
            column-widths-with-defaults-applied)]
      (-> db
        (assoc-in [widget-db-key table-key :column-widths] new-column-widths)
        (assoc-in [widget-db-key table-key :width] new-table-width)))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn register-events
  [widget-namespace-key]
  (doseq [[event make-event-handler]
          [[:end-column-resizing make-end-column-resizing-event-handler]
           [:start-column-resizing make-start-column-resizing-event-handler]
           [:set-width make-set-width-event-handler]]]
    (rf/reg-event-db
      (keyword widget-namespace-key event)
      (make-event-handler widget-namespace-key))))
