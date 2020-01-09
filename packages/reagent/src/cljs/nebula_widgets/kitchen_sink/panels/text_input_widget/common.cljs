(ns nebula-widgets.kitchen-sink.panels.text-input-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :text-input-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
