(ns nebula-widgets.kitchen-sink.panels.tabs-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :tabs-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  (utils/expand-paths
    [:active-tab
     :button-groups
     :collapsed
     [:items :placement]
     :layout
     [:sidebar :panel :placement]
     :size]))
