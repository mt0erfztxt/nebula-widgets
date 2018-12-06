(ns nebula-widgets.kitchen-sink.panels.checkable-input-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :checkable-input-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
