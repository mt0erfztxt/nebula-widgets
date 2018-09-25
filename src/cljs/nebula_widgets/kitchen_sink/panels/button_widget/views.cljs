(ns nebula-widgets.kitchen-sink.panels.button-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.widgets.button.core :as button]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.buttonWidgetPanel
   [man-page/widget {:title "Button widget"}
    [markdown/widget
     (str (-> #'button/widget meta :doc)
          "\n\n## Examples")]
    [example/widget {:cid "010", :title "default button"}
     [button/widget {:cid "010", :text "Default"}]
     "```clojure
       [button/widget {}]
       ```"]
    [example/widget {:cid "020", :title "disabled button"}
     [button/widget {:cid "010", :disabled true, :text "Default"}]
     "```clojure
       [button/widget {:disabled true}]
       ```"]]])
