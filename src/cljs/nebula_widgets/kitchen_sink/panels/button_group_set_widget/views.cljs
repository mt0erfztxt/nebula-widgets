(ns nebula-widgets.kitchen-sink.panels.button-group-set-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.widgets.button-group-set.core :as button-group-set]))

(def ^:private button-set
  (repeat 2 {:text "Button"}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let []
    [:div.buttonGroupSetWidgetPanel
     [man-page/widget {:title "Button group set widget"}
      [markdown/widget
       (-> #'button-group-set/widget meta :doc)
       "## Examples"]
      [example/widget {:cid "010", :title "default button group set"}
       [button-group-set/widget
        {:cid "010"
         :groups (for [alignment [:left :center :right]]
                   {:alignment alignment :buttons button-set})}]]]]))
