(ns nebula-widgets.kitchen-sink.panels.app-panel-widget.views
  (:require
    [nebula-widgets.widgets.app-panel :as app-panel]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  []
  [:div.appPanelWidgetPanel
   [app-panel/widget
    {:sidebars [{:expanded? true :placement "left"}]}
    "Hi, there!"]])
