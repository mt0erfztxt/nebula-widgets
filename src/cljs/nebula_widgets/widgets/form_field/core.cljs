(ns nebula-widgets.widgets.form-field.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem
  "nw-formField")

(def ^:private input-elt-bem
  (str bem "__input"))

(def ^:private label-elt-bem
  (str bem "__label"))

(def ^:private label-aux-elt-bem
  (str label-elt-bem "-aux"))

(defn- build-class [{:keys [cid cns inline required]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["inline" inline]
     ["required" required]]))

(defn- label-elt-cmp [label]
  (into
    [:div {:class label-elt-bem}]
    (if (coll? label)
      [(first label) [:span {:class label-aux-elt-bem} (second label)]]
      [label])))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form field.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - `:cid` - any, no default. Component id.
    - `:cns` - string, no default. Component ns.
    - `:inline` - logical true/false, no default. Whether label must be placed before or above input.
    - `:label` - string, tuple of strings, no default. Short description for field. When it's a tuple then first element
      would be used as label's main text and second element as auxiliary text.
    - `:required` - logical true/false, no default. When logical true then '*' would be appended to label.
  * `& children` - optional, any number of child components

  Notes:
  * form field widget is a base for more specific or concrete input targeted widgets and so accurate label and input
  positioning must be done in such concrete widgets"
  [& _args]
  (let [[{:keys [label] :as props} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     (when (seq label) [label-elt-cmp label])
     (into [:div {:class input-elt-bem}] children)]))
