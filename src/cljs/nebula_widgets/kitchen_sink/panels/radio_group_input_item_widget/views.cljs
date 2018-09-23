(ns nebula-widgets.kitchen-sink.panels.radio-group-input-item-widget.views
  (:require [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
            [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
            [nebula-widgets.widgets.radio-group-input.item :as radio-group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [man-page/widget {:title "Radio group input item widget"}
   [markdown/widget (-> #'radio-group-input-item/widget meta :doc)]])
