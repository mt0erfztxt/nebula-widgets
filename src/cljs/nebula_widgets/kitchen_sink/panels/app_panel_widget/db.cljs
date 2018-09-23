(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.db)

(def default-db
  {:app-panel-widget
   {:bar {:bottom {}, :top {:separated true}}
    :header {:absent false, :pinned false}
    :sidebar
    {:left
     {:collapsed false
      :gutter "normal"
      :size "normal"}
     :right
     {:collapsed false
      :gutter "normal"
      :size "normal"}}}})
