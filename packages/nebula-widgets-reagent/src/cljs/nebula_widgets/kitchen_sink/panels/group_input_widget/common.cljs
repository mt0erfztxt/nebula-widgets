(ns nebula-widgets.kitchen-sink.panels.group-input-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :group-input-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
