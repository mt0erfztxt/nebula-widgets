(ns nebula-widgets.widgets.form-field.core
  (:require
    [nebula-widgets.widgets.form-field.error :as form-field-error]
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private bem
  "nw-formField")

(def ^:private errors-elt-bem
  (str bem "__errors"))

(def ^:private errors-item-elt-bem
  (str errors-elt-bem "-item"))

(def ^:private input-elt-bem
  (str bem "__input"))

(def ^:private label-elt-bem
  (str bem "__label"))

(def ^:private label-aux-elt-bem
  (str label-elt-bem "-aux"))

(defn- build-class [{:keys [cid consider-input-margin display errors required]}]
  (bem-utils/build-class
    bem
    [["cid" cid]
     ["consider-input-margin" consider-input-margin]
     ["display" (-> display keyword #{:inline :stacked :table} (or :stacked))]
     ["invalid" (boolean (seq errors))]
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
    - `:consider-input-margin` - logical true/false, no default. When logical true then field would have smaller bottom
      padding, for example, it need to be set when field wraps group input component in which each child have bottom
      margin/padding.
    - `:errors` - collection, no default. Errors to display.
    - `:display` - one of :inline, :stacked (default) or :table, or their string symbol equivalents
    - `:label` - string, tuple of strings, no default. Short description for field. When it's a tuple then first element
      would be used as label's main text and second element as auxiliary text.
    - `:required` - logical true/false, no default. When logical true then '*' would be appended to label.
  * `& children` - optional, any number of child components

  TODO:
  * fix styles when using `:inline` and `:columns` with number of items that fit into one row (see inline widget
    example for details)
  * fix errors positioning when `:display` prop is 'inline or 'table
  * fix styles to vertically center label with `:display` set to 'table (interactive example with radio group input)"
  [& _args]
  (let [[{:keys [errors label] :as props} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     (when (seq label)
       [label-elt-cmp label])
     (into [:div {:class input-elt-bem}] children)
     (when (seq errors)
       (into
         [:ul {:class errors-elt-bem}]
         (for [error errors]
           [:li {:class errors-item-elt-bem}
            [form-field-error/widget {:text error}]])))]))
