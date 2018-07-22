(ns nebula-widgets.kitchen-sink.panels.card-widget.common)

(def ^:private event-ns "card-widget-panel")

(defn build-bar-setter-event-name [placement property]
  (keyword event-ns
           (str "set-" (name placement) "-bar-" (name property))))
