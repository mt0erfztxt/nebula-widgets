(ns nebula-widgets.kitchen-sink.panels.form-field-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :form-field-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))
