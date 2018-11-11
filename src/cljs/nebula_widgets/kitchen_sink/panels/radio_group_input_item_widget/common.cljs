(ns nebula-widgets.kitchen-sink.panels.radio-group-input-item-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :radio-group-input-item-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
