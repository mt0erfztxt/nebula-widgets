(ns nebula-widgets.kitchen-sink.widgets.markdown.core
  (:require
    [clojure.string :as str]
    [oops.core :as oops]
    [reagent.core :as r]))

(defn widget
  "Renders passed in Markdown syntax string as HTML."
  [_s]
  (r/create-class
    {:reagent-render
     (fn [s]
       [:div.markdown
        {:dangerouslySetInnerHTML
         {:__html (oops/ocall js/window "marked" s)}}])
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

(defn cleanup-code
  "Accepts triple back tiq code string and returns new string with whitespace padding at start of each string removed.
  In example below all subsequent lines after first would have two spaces removed from start of line:
  ```clojure
  (defn foo []
    bar)
  ```"
  [s]
  (str/replace
    s
    (->> s
         (re-find #"^```\w+\s( *)")
         (second)
         (str "(?m)^")
         (re-pattern))
    ""))
