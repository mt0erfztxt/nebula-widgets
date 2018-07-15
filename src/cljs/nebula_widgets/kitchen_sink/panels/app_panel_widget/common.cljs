(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.common)

(defn build-sidebar-setter-event-name [placement property]
  (keyword "app-panel-widget-panel"
           (str "set-" (name placement) "-sidebar-" (name property))))
