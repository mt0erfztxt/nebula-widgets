(ns nebula-widgets.kitchen-sink.panels.button-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :button-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
