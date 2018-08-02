(ns nebula-widgets.kitchen-sink.panels.radio-group-input-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-path [:panels :radio-group-input-widget])
(def panel-path->keyword (apply partial utils/path->keyword panel-path))
