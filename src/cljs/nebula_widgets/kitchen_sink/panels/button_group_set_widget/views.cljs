(ns nebula-widgets.kitchen-sink.panels.button-group-set-widget.views
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.widgets.button-group-set.core :as button-group-set]))

(defn- build-alignment-data
  "Accept integer and returns seq.

  Examples:
  - (build-data 2) => `[[:left [1 2]] [:center [3 4]] [:right [5 6]]]`
  - (build-data 3) => `[[:left [1 2 3]] [:center [4 5 6]] [:right [7 8 9]]]`."
  [n]
  (loop [m 1, [alignment :as alignments] [:left :center :right], result []]
    (if (empty? alignments)
      result
      (let [p (+ n m)]
        (recur p (rest alignments) (conj result [alignment (range m p)]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  (let []
    [:div.buttonGroupSetWidgetPanel
     [man-page/widget
      "# Button group set widget"
      (-> #'button-group-set/widget meta :doc)
      "## Examples"
      [example/widget {:cid "010", :title "default button group set"}
       [button-group-set/widget
        {:cid "010"
         :groups (for [[alignment xs] (build-alignment-data 2)]
                   {:alignment alignment, :buttons (for [n xs] {:cid n, :text (str "Button" n)})})}]
       "```clj
         [button-group-set/widget
          {:groups [{:alignment \"left\", :buttons [{...} {...}]}
                    {:alignment \"center\", :buttons [{...} {...}]}
                    {:alignment \"right\", :buttons [{...} {...}]}]
         ```"]
      [example/widget {:cid "020", :title "disabled button group set"}
       [button-group-set/widget
        {:cid "010"
         :disabled true
         :groups (for [alignment [:left :center :right]]
                   {:alignment alignment, :buttons (repeat 2 {:disabled false, :text "Button"})})}]
       "```clj
         [button-group-set/widget
          {:disabled true
           :groups [{:disabled false, :buttons [{:disabled false, :text \"Button\"} ...]}]
         ```"]]]))
