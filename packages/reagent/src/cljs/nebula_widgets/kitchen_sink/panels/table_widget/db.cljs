(ns nebula-widgets.kitchen-sink.panels.table-widget.db)

(defn default-db
  [db]
  (-> db
    (assoc-in
      [:nw-table :example-table]
      {:column-order [:a :b :c]
       :column-widths {:a 240, :b 150, :c 200}})
    (assoc-in [:panel :table-widget] {:interactive-example {}})))
