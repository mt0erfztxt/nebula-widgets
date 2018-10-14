(ns nebula-widgets.kitchen-sink.panels.button-group-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.widgets.button-group.core :as button-group]))

(def ^:private button-set
  (repeat 3 {:text "Button"}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let []
    [:div.buttonGroupWidgetPanel
     [man-page/widget
      "# Button group widget"
      (-> #'button-group/widget meta :doc)
      "## Examples"
      [example/widget {:cid "010", :title "default button group with three buttons"}
       [button-group/widget {:buttons button-set, :cid "010"}]
       "```clojure
         [button-group/widget {:buttons (repeat 3 {:text \"Button\"})}]
         ```"]
      (let [button-set (take 2 button-set)]
        [example/widget {:cid "020", :title "button group alignment"}
         [:div {:style {:position "relative", :text-align "center"}}
          (map-indexed
            #(with-meta
               [button-group/widget {:alignment %2, :buttons button-set, :cid (->> %1 inc (* 10) (str "0"))}]
               {:key %1})
            [:left :center :right])]
         "```clojure
           [button-group/widget
            {:alignment \"left\"   ; center, right
             :buttons [...]}]
           ```"])
      [example/widget {:cid "030", :title "disabled button group"}
       [button-group/widget
        {:buttons
         [{:text "Button1"}
          {:text "Button2", :disabled false}
          {:text "Button3"}]
         :cid "010"
         :disabled true}]
       "```clojure
         [button-group/widget
          {:buttons [...]
           :disabled true}]
         ```"]]]))
