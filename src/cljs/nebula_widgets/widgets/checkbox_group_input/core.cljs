(ns nebula-widgets.widgets.checkbox-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.checkbox-input.core :as checkbox-input]
    [reagent.core :as r]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of checkbox inputs.

  Arguments:
  * `props` - map. Same as in [group-input](/widgets/group-input) widget, plus:
    - `:boolean` - logical true/false, no default. When logical true, each map in `:items` must have `:path` key,
      otherwise it must have `:value` key.
    - `:items` - seq of maps, no default. Each map is a props for [checkbox-input](/widgets/checkbox-input) widget.
    - `:on-change` - function, no default. Called with value of `:path` prop when `:boolean` is logical true or value of
      `:value` prop otherwise, and browser event as arguments when item checked or unchecked.
    - `:value` - map or set, no default. Used to determine checked items. When `:boolean` prop is logical true it must
      be a map where each key is a path to item's value (as in `clojure.core/get-in`) and its value is an item's value,
      otherwise it must be a set of values of checked items.

  Notes:
  * item path (see `:boolean` prop) is convenient to group multiple boolean fields in one widget, meantime item value
    convenient when single field is a collection of distinct elements

  TODO:
  * fix styles for case when `:widget` is :native
  * fix styles for case when `:widget` is :button and item's label is shrinked"
  [{:keys [item-props items on-change value] :as props}]
  (let [use-path? (:boolean props)]
    [group-input/widget
     (-> props
         (assoc
           :bem "nw-checkboxGroupInput"
           :item-widget checkbox-input/widget
           :items
           (for [{:keys [path] v :value :as item} items]
             (merge
               item-props
               item
               {:checked
                (if use-path?
                  (->> path (get-in value) boolean)
                  (contains? value v))
                :on-change (r/partial on-change (if use-path? path v))})))
         (dissoc :item-props))]))
