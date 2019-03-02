(ns nebula-widgets.kitchen-sink.panels.action-group-action-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :action-group-action-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  [:accented :active :disabled :href :icon :reversed :text :size])
