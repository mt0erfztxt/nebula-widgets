(ns nebula-widgets.kitchen-sink.panels.checkbox-group-input-item-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.widgets.checkbox-group-input.item :as checkbox-group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [man-page/widget
   "# Checkbox group input item widget"
   (-> #'checkbox-group-input-item/widget meta :doc)])
