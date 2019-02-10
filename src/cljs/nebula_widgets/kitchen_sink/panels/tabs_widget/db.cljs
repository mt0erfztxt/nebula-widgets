(ns nebula-widgets.kitchen-sink.panels.tabs-widget.db)

(def default-db
  {:tabs-widget
   {:interactive-example
    {:active-tab "tab1"
     :button-groups "after"
     :collapsed false
     :items {:placement "start"}
     :layout "horizontal"
     :sidebar
     {:panel "normal"
      :placement "none"}
     :size "normal"}}})
