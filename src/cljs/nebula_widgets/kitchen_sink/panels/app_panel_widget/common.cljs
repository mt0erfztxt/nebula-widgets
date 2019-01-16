(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.common
  (:require
    [nebula-widgets.utils :as utils]))

(def panel-key
  :app-panel-widget)

(def panel-path
  [:panels panel-key])

(def panel-path->keyword
  (apply partial utils/path->keyword panel-path))

(def knobs
  (utils/expand-paths
    [:header
     :layout
     [:sidebars
      [:left :collapsed :gutter :size]
      [:right :collapsed :gutter :size]]
     :toolbars]))