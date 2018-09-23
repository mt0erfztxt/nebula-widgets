(ns nebula-widgets.kitchen-sink.panels.group-input-item-widget.views
  (:require [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
            [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
            [nebula-widgets.widgets.group-input.item :as group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [man-page/widget {:title "Group input item widget"}
   [markdown/widget (-> #'group-input-item/widget meta :doc)]])
