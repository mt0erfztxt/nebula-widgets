(ns nebula-widgets.widgets.checkable-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.checkable-input.core :as checkable-input]
    [reagent.core :as r]))

(defn- update-item-label-prop [label-shrinked {:keys [label] :as item-props}]
  (if (nil? label-shrinked)
    item-props
    (if (map? label)
      (assoc-in item-props [:label :shrinked] label-shrinked)
      (assoc item-props :label {:shrinked label-shrinked, :text label}))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of checkable inputs.

  Arguments:
  * `props` - map. Same as in [group-input](/widgets/group-input) widget, plus:
    - `:boolean` - logical true/false, no default. Only for group with `:multi-checkable` set to logical true, and when
      logical true, each map in `:items` must have `:path` key, otherwise it must have `:value` key.
    - `:items` - seq of maps, no default. Each map is a props for [checkable-input](/widgets/checkable-input) widget.
    - `:label-shrinked` - logical true/false, no default. Whether items in group has their label shrinked or not.
    - `:on-change` - function, no default. It called with value of `:path` prop when `:multi-checkable` and `:boolean`
      are logical true or value of `:value` prop otherwise, and browser event as arguments when item checked or
      unchecked.
    - `:multi-checkable` - logical true/false, true by default. The difference is like between group of radio button and
      checkbox inputs, but here checked radio button can be unchecked.
    - `:value` - depends on other props, no default. Used to determine checked item(-s). When `:multi-checkable` and
      `:boolean` are logical true it must be a map where each key is a path to item value (as in `clojure.core/get-in`)
      and its value is an item's value, when `:boolean` is logical false it must be a set of values of checked items,
      and for when `:multi-checkable` is logical false it can be any value and item with that value would be checked.
    - `:widget` - one of :button, :checkbox (default), :radio or their string/symbol equivalents. Used to specify widget
      for all items at once, but can be overridden per item in `:items` prop.

  Notes:
  * for `:multi-checkable` item, path (see `:boolean` prop) is convenient to group multiple boolean fields into one
    widget, meantime item value convenient when single field is a collection of distinct elements

  TODO:
  * fix styles for case when `:widget` is :button and item's label is shrinked"
  [{:keys [disabled item-props items label-shrinked multi-checkable on-change value] :as props}]
  (let [item-widget (-> props :widget (#(if (nil? %) "checkbox" %)))
        multi-checkable (if (nil? multi-checkable) true multi-checkable)
        use-path (and multi-checkable (:boolean props))]
    [group-input/widget
     (-> props
         (assoc
           :bem "nw-checkableGroupInput"
           :group-custom-props [["labelShrinked" label-shrinked] ["multiCheckable" multi-checkable]]
           :item-widget checkable-input/widget
           :items
           (for [{:keys [path] v :value :as item} items
                 :let [checked
                       (cond
                         use-path (->> path (get-in value) boolean)
                         multi-checkable (contains? value v)
                         :else (= v value))]]
             (merge
               {:widget item-widget}
               (update-item-label-prop label-shrinked item-props)
               item
               {:checked checked
                :disabled (boolean (if disabled disabled (:disabled item)))
                :group-item-custom-props [["checked" checked]]
                :on-change (r/partial on-change (if use-path path v))})))
         (dissoc :item-props))]))
