(ns nebula-widgets.widgets.group-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [reagent.core :as r]))

(def ^:private default-bem
  "nw-groupInput")

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-error-elt-bem [bem]
  (str (build-bem bem) "__error"))

(defn- build-errors-elt-bem [bem]
  (str (build-bem bem) "__errors"))

(defn- build-inner-elt-bem [bem]
  (str (build-bem bem) "__inner"))

(defn- build-item-elt-bem [bem]
  (str (build-bem bem) "__item"))

(defn- build-class [{:keys [bem cid columns cns disabled equidistant inline invalid size stacked-on-mobile widget]}]
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["columns" columns]
     ["disabled" disabled]
     ["equidistant" equidistant]
     ["inline" (or inline (pos? columns))]
     ["invalid" invalid]
     ["size" (-> size keyword #{:large :normal :small} (or :normal))]
     ["stacked-on-mobile" stacked-on-mobile]
     ["widget" (-> widget keyword #{:button :icon :native} (or :icon))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group input. Not intended to be used directly but rather as base for more specific group input widgets.
  Accepts optional props map and variable number of child components.
  Supported props:
  * :bem - string, nw-groupInput by default. Would be used as widget's BEM.
  * :cid - any, no default. Component id.
  * :columns - integer, no default. Number of items per row.
  * :cns - any, no default. Component namespace.
  * :disabled - logical true/false, no default. Whether widget disabled or not.
  * :equidistant - logical true/false, no default. Whether items have same width.
  * :errors - seq of strings, no default. would be displayed only when not empty and :invalid.
  * :inline - logical true/false, no default. Whether items grouped stacked or inline.
  * :invalid - logical true/false, no default. Whether widget is in invalid state or not.
  * :item-props - map, no default. Common props for all items in group, for example, event handlers.
  * :size - one of :large, :normal (default), :small or their string/symbol equivalents. Widget size.
  * :soft-columns - logical true/false, no default. When logical true and :columns is also set then 'min-width' style is
    used instead of 'width'.
  * :stacked-on-mobile - logical true/false, no default. whether items forcibly stacked on mobile screens.
  * :value - any, no default. Used as values for items, for example, in checkbox group input it used to determine which
    items are checked.
  * :widget - any, no default. Widget visual look, see concrete group input item implementation for details."
  [& _args]
  (let [[{:keys [bem columns errors soft-columns] :as props} children] ((juxt r/props r/children) (r/current-component))]
    [:div {:class (build-class props)}
     (into [:div {:class (build-inner-elt-bem bem)}]
           (for [child children]
             (let []
               [:div (cond-> {:class
                              (bem-utils/build-class
                                (build-item-elt-bem bem)
                                [["checked" (-> child second :checked)]])}
                             (and (integer? columns) (pos? columns))
                             (update :style assoc (if soft-columns :min-width :width) (str (/ 100 columns) "%")))
                child])))
     (when (and (:invalid props) (seq errors))
       (into [:ul {:class (build-errors-elt-bem bem)}]
             (for [error errors] [:li {:class (build-error-elt-bem bem)} error])))]))
