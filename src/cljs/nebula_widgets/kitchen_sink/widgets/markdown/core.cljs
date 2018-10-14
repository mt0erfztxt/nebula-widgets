(ns nebula-widgets.kitchen-sink.widgets.markdown.core
  (:require
    [nebula-widgets.utils :as utils]
    [oops.core :as oops]
    [reagent.core :as r]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders any number of Markdown strings as HTML. Each string starts new paragraph."
  [& _xs]
  (r/create-class
    {:reagent-render
     (fn [& xs]
       [:div.markdown
        {:dangerouslySetInnerHTML
         {:__html (oops/ocall js/window "marked" (->> xs (interpose "\n\n") (apply str) utils/remove-padding))}}])
     :component-did-mount
     (fn [this]
       (let [node (r/dom-node this)
             nodes (oops/ocall node "querySelectorAll" "pre code")]
         (let []
           (loop [i (oops/oget nodes "length")]
             (when-not (neg? i)
               (when-let [item (oops/ocall nodes "item" i)]
                 (oops/ocall js/hljs "highlightBlock" item))
               (recur (dec i)))))))}))
