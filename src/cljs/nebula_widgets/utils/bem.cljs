(ns nebula-widgets.utils.bem
  (:require
    [clojure.string :as str]))

(defn to-modifier-name [v]
  (if (or (string? v) (keyword? v) (symbol? v))
    (name v)
    (throw (js/TypeError. "BEM modifier name must be a string, a keyword or a symbol"))))

(defn modifier->string
  "Accepts BEM modifier name an optional BEM modifier value. Returns nil when name is a nil, blank string or false, or
  string representation of BEM modifier otherwise. When value is `true` then simple modifier returned. Also, when
  modifier name is 'cid', then dots in modifier value would be replaced with dashes.
  Examples, ['foo' 'bar'] => 'foo_bar', ['foo' true] => 'foo', ['cid' 'foo.bar.buz'] => 'cid_foo-bar-buz'."
  ([m-name] (modifier->string m-name true))
  ([m-name m-value]
   (when-not (or (str/blank? m-name) (str/blank? m-value) (false? m-value))
     (let [m-name (to-modifier-name m-name)]
       (if (true? m-value)
         m-name
         (str
           m-name "_"
           (cond
             (number? m-value) m-value
             (= "cid" m-name) (-> m-value name (str/replace "." "-"))
             :else (name m-value))))))))

(defn build-class [base modifiers]
  "Returns string, as for class attribute of DOM element, constructed from BEM base and seq of modifiers, where each
  modifier can be anything that `modifier->string` supports.
  Example, (build-class 'foo' [['bar' 42]]) => 'foo foo--bar_42'."
  (let [base (name base)]
    (->> modifiers
         (map #(->> (if (sequential? %) % [%]) (apply modifier->string)))
         (remove empty?)
         (map (partial str base "--"))
         (cons base)
         (str/join " "))))
