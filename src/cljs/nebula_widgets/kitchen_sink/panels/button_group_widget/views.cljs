(ns nebula-widgets.kitchen-sink.panels.button-group-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown]
    [nebula-widgets.widgets.button-group.core :as button-group]))

(def ^:private button-set
  (repeat 3 {:text "Button"}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let []
    [:div.buttonGroupWidgetPanel
     [man-page/widget {:title "Button group widget"}
      [markdown/widget
       (-> #'button-group/widget meta :doc)
       "## Examples"]
      [example/widget {:cid "010", :title "default button group with three buttons"}
       [button-group/widget {:buttons button-set, :cid "010"}]
       "```clojure
         [button-group/widget {:buttons (repeat 3 {:text \"Button\"})}]
         ```"]
      (let [button-set (take 2 button-set)]
        [example/widget {:cid "020", :title "button group alignment"}
         [:div {:style {:position "relative", :text-align "center"}}
          [button-group/widget {:alignment "left", :buttons button-set, :cid "010"}]
          [button-group/widget {:alignment "center", :buttons button-set, :cid "020"}]
          [button-group/widget {:alignment "right", :buttons button-set, :cid "030"}]]
         "```clojure
           [button-group/widget
            {:alignment \"left\"   ; center, right
             :buttons [...]}]
           ```"])
      [example/widget {:cid "030", :title "disabled button group"}
       [button-group/widget
        {:buttons [{:text "Button1"} {:disabled false, :text "Button 2"} {:text "Button3"}]
         :cid "010"
         :disabled true}]
       "```clojure
         [button-group/widget
          {:buttons [...]
           :disabled true}]
         ```"]]]))
