(ns nebula-widgets.utils.bem
  (:require
    [clojure.string :as str]))

(defn to-modifier-name [v]
  (if (or (string? v) (keyword? v) (symbol? v))
    (name v)
    (throw (js/TypeError. "BEM modifier name must be a string, a keyword or a symbol"))))

(defn modifier->string
  "Returns string representation of BEM modifier. Example, ['foo' 'bar'] => 'foo_bar'."
  ([m-name m-value]
   (when-not (or (str/blank? m-name) (str/blank? m-value) (false? m-value))
     (let [m-name (to-modifier-name m-name)]
       (if (true? m-value)
         m-name
         (str m-name "_" (if (number? m-value) m-value (name m-value)))))))
  ([m-name]
   (modifier->string m-name true)))

(defn build-class [base modifiers]
  "Returns string, as for class attribute of DOM element, constructed from BEM base and seq of modifiers, where each
  modifier can be anything that `build-modifier` supports. Example, 'foo foo--bar_42'."
  (let [base (name base)]
    (->> modifiers
         (map #(->> (if (sequential? %) % [%]) (apply modifier->string)))
         (remove empty?)
         (map (partial str base "--"))
         (cons base)
         (str/join " "))))
