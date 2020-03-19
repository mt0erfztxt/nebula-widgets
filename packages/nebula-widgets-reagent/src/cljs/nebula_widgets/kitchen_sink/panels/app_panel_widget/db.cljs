(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.db)

(def default-db
  {:app-panel-widget
   {:interactive-example
    {:footer false
     :header false
     :layout "pinned-header"
     :sidebars
     {:left
      {:collapsed false
       :exists true
       :gutter "none"
       :size "normal"}
      :right
      {:collapsed false
       :exists false
       :gutter "none"
       :size "normal"}}
     :toolbars "top2"}}})
