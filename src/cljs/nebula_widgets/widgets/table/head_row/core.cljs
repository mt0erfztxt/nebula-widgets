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
(def ^:private column-min-width 64)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  [{:keys [on-end-column-resizing on-start-column-resizing] :as props}]
  (let [listener-keys (atom nil)
        node (atom nil)
        left (atom nil)
        resizing? (atom (:column-resizing props))
        resize-handle-node (atom nil)
        ;; A seq of columns width needed to calculate position of column's resize handle. For example, if we have a
        ;; table with four columns, then:
        ;; * when resizing first column it would be (col1-width, col2-width)
        ;; * when resizing second column it would be (col1-width, col2-width, col3-width)
        resizing-columns-width (atom [])
        resizing-column-right-sibling-width (atom nil)
        resizing-column-and-left-siblings-widths (atom nil)
        resizing-column-left-siblings-widths (atom nil)
        resizing-column-width (atom nil)
        resizing-column-new-width (atom nil)
        on-end-column-resizing
        (fn [column-cid]
          (reset! resize-handle-node nil)
          (reset! resizing-columns-width nil)
          (on-end-column-resizing column-cid @resizing-column-new-width)
          (reset! resizing-column-new-width nil))
        on-start-column-resizing
        (fn [column-cid column-handle-node]
          (reset! resize-handle-node column-handle-node)
          (let [this-column-node (gdom/getParentElement column-handle-node)
                next-column-node (gdom/getNextElementSibling this-column-node)
                previous-columns-nodes
                (loop [acc [], node this-column-node]
                  (if-let [previous-column-node (gdom/getPreviousElementSibling node)]
                    (recur (conj acc previous-column-node) previous-column-node)
                    acc))
                columns-widths
                (map #(-> % gstyle/getSize (oops/oget "width"))
                     (into previous-columns-nodes [this-column-node next-column-node]))]
            (reset! resizing-columns-width columns-widths)
            (reset! left (-> @node gstyle/getBounds (oops/oget "left")))
            (reset! resizing-column-right-sibling-width (last columns-widths))
            (let [widths (reset! resizing-column-and-left-siblings-widths (drop-last columns-widths))]
              (reset! resizing-column-left-siblings-widths (drop-last widths))
              (reset! resizing-column-width (last widths))))
          (on-start-column-resizing column-cid))]
    (r/create-class
      {:display-name "nebula-widgets.widgets.table.head-row.core.widget"
       :reagent-render
       (fn [{:keys [column-order column-resizing column-titles column-widths]}]
         [:div {:class bem}
          (for [{:keys [cid] :as column}
                (map
                  (fn [cid]
                    {:cid cid
                     :resizing? (= cid column-resizing)
                     :title (get column-titles cid)
                     :width (get column-widths cid)})
                  column-order)]
            ^{:key cid}
            [cell/widget column on-end-column-resizing on-start-column-resizing resize-handle-node])])
       :component-did-mount
       (fn [this]
         (let [node (reset! node (r/dom-node this))]
           (reset!
             listener-keys
             [(gevents/listen
                node
                EventType/MOUSEMOVE
                (fn [event]
                  (let [resize-handle-node @resize-handle-node]
                    (when (and resize-handle-node @resizing?)
                      (let [left @left
                            resizing-column-width @resizing-column-width
                            client-x (oops/oget event "clientX")
                            max-x (- (+ resizing-column-width @resizing-column-right-sibling-width) column-min-width)
                            x
                            (-> (reduce + @resizing-column-and-left-siblings-widths)
                              (+ left)
                              (- client-x resizing-column-width)
                              (Math/abs)
                              (Math/floor)
                              (#(if (> % max-x) max-x %))
                              (#(if (or (< % column-min-width)
                                        (< client-x (reduce + (cons left @resizing-column-left-siblings-widths))))
                                  column-min-width
                                  %)))]
                        (gstyle/setPosition resize-handle-node x)
                        (reset! resizing-column-new-width x))))))])))
       :component-did-update
       (fn [this old-argv]
         (let [[old-resizing? new-resizing?] (map #(-> % second :column-resizing) [old-argv (r/argv this)])]
           (when (not= new-resizing? old-resizing?)
             (reset! resizing? new-resizing?))))
       :component-will-unmount
       (fn [_]
         (doseq [k @listener-keys]
           (when k
             (gevents/unlistenByKey k))))})))
