(ns nebula-widgets.widgets.checkable-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.checkable-input.core :as checkable-input]
    [reagent.core :as r]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of checkable inputs.

  Arguments:
  * `props` - map. Same as in [group-input](/widgets/group-input) widget, plus:
    - `:boolean` - logical true/false, no default. Only for group with `:selection-mode` set to :multi, when logical
      true, each map in `:items` must have `:path` key, otherwise it must have `:value` key.
    - `:items` - seq of maps, no default. Each map is a props for [checkable-input](/widgets/checkable-input) widget.
    - `:on-change` - function, no default. Called with value of `:path` prop when `:boolean` is logical true or value of
      `:value` prop otherwise, and browser event as arguments when item checked or unchecked.
    - `:on-change` - function, no default. It called with value of `:path` prop when `:selection-mode` is :multi and
      `:boolean` is logical true or value of `:value` prop otherwise, and browser event as arguments when item checked
      or unchecked.
    - `:selection-mode` - one of :multi (default), :single or their string/symbol equivalents. The difference is like
      between group of radio button and checkbox inputs, but here checked radio button can be unchecked.
    - `:value` - any, no default. Item, which have `:value` prop equal that value, would be checked.
    - `:value` - depends on other props, no default. Used to determine checked item(-s). When `:selection-mode` is
      :multi and `:boolean` prop is logical true it must be a map where each key is a path to item's value (as in
      `clojure.core/get-in`) and its value is an item's value, when `:boolean` is logical false it must be a set of
      values of checked items, and for :single `:selection-mode` it can be any value and item with that value would be
      checked.

  Notes:
  * for :multi `:selection-mode` item path (see `:boolean` prop) is convenient to group multiple boolean fields in one
    widget, meantime item value convenient when single field is a collection of distinct elements

  TODO:
  * fix styles for case when `:widget` is :native
  * fix styles for case when `:widget` is :button and item's label is shrinked"
  [{:keys [item-props items on-change selection-mode value] :as props}]
  (let [multi-selection? (= :multi selection-mode)
        use-path? (and multi-selection? (:boolean props))]
    [group-input/widget
     (-> props
         (assoc
           :bem "nw-checkableGroupInput"
           :item-widget checkable-input/widget
           :items
           (for [{:keys [path] v :value :as item} items]
             (merge
               item-props
               item
               {:checked                                    ; FIX: Doesn't work for multi selection (see ie)
                (cond
                  use-path? (->> path (get-in value) boolean)
                  multi-selection? (contains? value v)
                  :else (= v value))
                :on-change (r/partial on-change (if use-path? path v))
                :selection-mode selection-mode})))
         (dissoc :item-props))])
  #_[group-input/widget
     (-> props
         (assoc
           :bem "nw-radioGroupInput"
           :item-widget checkable-input/widget
           :items
           (for [{v :value :as item} items]
             (merge
               item-props
               item
               {:checked (= v value)
                :on-change (r/partial on-change v)})))
         (dissoc :item-props))])
