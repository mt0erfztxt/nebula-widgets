(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-path
  [:panels :checkbox-group-input-widget])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
