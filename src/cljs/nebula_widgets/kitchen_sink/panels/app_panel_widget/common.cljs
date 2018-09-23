(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.common)

(def ^:private event-ns
  "app-panel-widget-panel")

(defn build-bar-setter-event-name [placement property]
  (keyword event-ns
           (str "set-" (name placement) "-bar-" (name property))))

(defn build-header-setter-event-name [property]
  (keyword event-ns
           (str "set-header-" (name property))))

(defn build-sidebar-setter-event-name [placement property]
  (keyword event-ns
           (str "set-" (name placement) "-sidebar-" (name property))))
