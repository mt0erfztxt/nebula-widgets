(ns nebula-widgets.widgets.table.head-row.core
  (:require
    [goog.dom :as gdom]
    [goog.events :as gevents]
    [goog.events.EventType :as EventType]
    [goog.style :as gstyle]
    [nebula-widgets.widgets.table.head-row.cell :as cell]
    [oops.core :as oops]
    [reagent.core :as r]))

(def ^:private bem "nw-table-headRow")
(def ^:private default-width 100)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Calculate new width for columns then update table's columns state if any width changed.
(defn widget [{:keys [on-end-column-resizing on-start-column-resizing] :as props} _table-width]
  (let [listener-keys (atom [])
        resizing? (atom (:column-resizing props))
        resize-handle-node (atom nil)
        resizing-columns-width (atom nil)
        on-end-column-resizing
        (fn [column-cid]
          (reset! resize-handle-node nil)
          (reset! resizing-columns-width nil)
          (on-end-column-resizing column-cid))
        on-start-column-resizing
        (fn [column-cid node]
          (reset! resize-handle-node node)
          (let [this-column-node (gdom/getParentElement node)
                next-column-node (gdom/getNextElementSibling this-column-node)
                previous-columns-nodes
                (loop [acc [], node this-column-node]
                  (if-let [previous-column-node (gdom/getPreviousElementSibling node)]
                    (recur (conj acc previous-column-node) previous-column-node)
                    acc))]
            (reset! resizing-columns-width
                    (map #(-> % gstyle/getSize (oops/oget "width"))
                         (into previous-columns-nodes [this-column-node next-column-node]))))
          (on-start-column-resizing column-cid))]
    (r/create-class
      {:display-name bem
       :reagent-render
       (fn [{:keys [columns column-resizing]} table-width]
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
              ^{:key cid} [cell/widget column on-end-column-resizing on-start-column-resizing resize-handle-node])]))
       :component-did-mount
       (fn [this]
         (let [node (r/dom-node this)]
           (let [column-min-width 64]
             (reset!
               listener-keys
               [(gevents/listen
                  node
                  EventType/MOUSEMOVE
                  (fn [event]
                    (let [resize-handle-node @resize-handle-node]
                      (when (and resize-handle-node @resizing?)
                        (let [node-bounds (gstyle/getBounds node)
                              resizing-columns-width @resizing-columns-width
                              client-x (oops/oget event "clientX")
                              left (oops/oget node-bounds "left")
                              column-widths (drop-last resizing-columns-width)
                              resizing-column-width (last column-widths)
                              max-x (-> resizing-column-width (+ (last resizing-columns-width)) (- column-min-width))
                              min-x column-min-width
                              x
                              (-> (reduce + column-widths)
                                (+ left)
                                (- client-x resizing-column-width)
                                (Math/abs)
                                (Math/floor)
                                (#(if (or (< % min-x)
                                          (< client-x (reduce + (cons left (drop-last 2 resizing-columns-width)))))
                                    min-x
                                    %))
                                (#(if (> % max-x) max-x %)))]
                          (gstyle/setPosition resize-handle-node x))))))]))))
       :component-did-update
       (fn [this old-argv]
         (let [[old-resizing? new-resizing?] (map #(-> % second :column-resizing) [old-argv (r/argv this)])]
           (when (not= new-resizing? old-resizing?)
             (reset! resizing? new-resizing?))))
       :component-will-unmount
       (fn [_]
         (doseq [k (seq @listener-keys)]
           (when k
             (gevents/unlistenByKey k))))})))
