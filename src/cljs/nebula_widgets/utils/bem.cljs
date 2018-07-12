(ns nebula-widgets.utils.bem
  (:require
    [clojure.string :as str]))

(defn modifier->string
  "Returns string representation of BEM modifier. Example, ['foo' 'bar'] => 'foo_bar'."
  ([m-name m-value]
   (cond
     (or (str/blank? m-name) (str/blank? m-value) (false? m-value)) nil
     (true? m-value) (name m-name)
     :else (str (name m-name) "_" (if (number? m-value) m-value (name m-value)))))
  ([m-name]
   (modifier->string m-name true)))

(defn build-class [base modifiers]
  "Returns string, as for class attribute of DOM element, constructed from BEM base and seq of modifiers, where each
  modifier can be anything that `build-modifier` supports. Example, 'foo foo--bar_42'."
  (->> modifiers
       (map #(->> (if (sequential? %) % [%]) (apply modifier->string)))
       (remove empty?)
       (map (partial str base "--"))
       (cons base)
       (str/join " ")))
