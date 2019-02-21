(ns nebula-widgets.kitchen-sink.panels.action-panel-action-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :action-panel-action-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  [:accented :active :disabled :font-size :href :icon :reversed :text :size])
