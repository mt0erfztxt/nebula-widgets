(ns nebula-widgets.kitchen-sink.panels.table-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.table-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.table.core :as table]
    [re-frame.core :as rf]))

(def ^:private bem "tableWidgetPanel")

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> common/knobs
    (map
      (fn [prop]
        [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
    (into {})))

(defn- interactive-example-cmp
  []
  (let [table-cid :example-table
        column-order (rf/subscribe [:nw-table/column-order table-cid])
        column-resizing (rf/subscribe [:nw-table/column-resizing table-cid])
        column-widths (rf/subscribe [:nw-table/column-widths table-cid])
        on-end-column-resizing #(rf/dispatch [:nw-table/end-column-resizing table-cid %1 %2])
        on-start-column-resizing #(rf/dispatch [:nw-table/start-column-resizing table-cid %])
        on-resize #(rf/dispatch [:nw-table/set-width table-cid %])
        props (rf/subscribe [(interactive-example-path->keyword)])
        width (rf/subscribe [:nw-table/width table-cid])]
    (fn interactive-example-cmp-renderer []
      (into
        [ie/widget
         [table/widget
          {:cid table-cid
           :column-order @column-order
           :column-resizing @column-resizing
           :column-titles {:a "Column A", :b "Column B", :c "Column C"}
           :column-widths @column-widths
           :on-end-column-resizing on-end-column-resizing
           :on-start-column-resizing on-start-column-resizing
           :on-resize on-resize
           :rows
           [{:cid 0, :a "a0", :b "b0", :c "c0"}
            {:cid 1, :a "a1", :b "b1", :c "c1"}
            {:cid 2, :a "a2", :b "b2", :c "c2"}]
           :width @width}]]
        (for
          [params
           [[:- "widget props"]]
           :let [[cid label-or-items] (if (sequential? params) params [params])
                 label? (= :- cid)]]
          [ie-cgi-knob/widget
           {:cid cid, :label (when label? label-or-items)}
           (cond->
             {:cid cid
              :on-change (get ie-setters cid)
              :value (get @props cid)}
             (and (not label?) label-or-items) (assoc :items label-or-items))])))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  []
  [:div {:class bem}
   [man-page/widget
    "# Table widget"
    (-> #'table/widget meta :doc)
    "## Interactive example"
    [interactive-example-cmp]]])
