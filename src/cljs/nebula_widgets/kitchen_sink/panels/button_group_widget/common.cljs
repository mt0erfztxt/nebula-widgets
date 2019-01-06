(ns nebula-widgets.kitchen-sink.panels.button-group-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :button-group-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
