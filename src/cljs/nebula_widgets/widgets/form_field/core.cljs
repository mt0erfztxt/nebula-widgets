(ns nebula-widgets.widgets.form-field.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private default-bem
  "nw-formField")

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-input-elt-bem [bem]
  (str (build-bem bem) "__input"))

(defn- build-label-elt-bem [bem]
  (str (build-bem bem) "__label"))

(defn- build-label-aux-elt-bem [bem]
  (str (build-label-elt-bem bem) "-aux"))

(defn- build-class [{:keys [bem cid cns disabled inline required]}]
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["inline" inline]
     ["required" required]]))

(defn- label-elt-cmp [bem label]
  (into
    [:div {:class (build-label-elt-bem bem)}]
    (if (coll? label)
      [(first label) [:span {:class (build-label-aux-elt-bem bem)} (second label)]]
      [label])))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form field.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - `:bem` - string, 'nw-formField' by default. Would be used as widget's BEM. Provided by concrete form field widget
      to augment styling.
    - `:cid` - any, no default. Component id.
    - `:cns` - string, no default. Component ns.
    - `:disabled` - logical true/false, no default. Whether widget disabled or not.
    - `:inline` - logical true/false, no default. Whether label must be placed before or above input.
    - `:label` - string, tuple of strings, no default. Short description for field. When it's a tuple then first element
      would be used as label's main text and second element as auxiliary text.
    - `:required` - logical true/false, no default. When logical true then '*' would be appended to label.
  * `& children` - optional, any number of child components

  Notes:
  * form field widget is a base for concrete input targeted widgets and so accurate label and input positioning must be
    done in such concrete widgets"
  [& _args]
  (let [[{:keys [bem label] :as props} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     (when (seq label) [label-elt-cmp bem label])
     (into [:div {:class (build-input-elt-bem bem)}] children)]))
