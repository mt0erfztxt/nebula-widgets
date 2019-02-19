(ns nebula-widgets.kitchen-sink.panels.toolbar-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :toolbar-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  [:disabled :size])
