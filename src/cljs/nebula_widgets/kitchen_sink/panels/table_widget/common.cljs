(ns nebula-widgets.kitchen-sink.panels.table-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :table-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  [])
