(ns nebula-widgets.kitchen-sink.panels.tab-group-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :tab-group-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  (utils/expand-paths
    [:active-tab
     :alignment
     :button-groups
     :collapsed
     :layout
     [:sidebar :placement :size]
     :size]))
