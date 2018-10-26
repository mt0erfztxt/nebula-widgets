(ns nebula-widgets.widgets.checkbox-group-input.core
  (:require
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.checkbox-group-input.item :as checkbox-group-input-item]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of checkbox inputs.

  Arguments:
  * `props` - optional, map. Same as in [group-input](/widgets/group-input) widget, plus:
    - `:boolean` - logical true/false, no default. When logical true, each map in `:items` must have `:path` key,
      otherwise it must have `:value` key.
    - `:items` - seq of maps, no default. Group items, each map is a props for
      [checkbox-group-input-item](/widgets/checkbox-group-input-item) widget.
    - `:value` - map or set, no default. Used to determine checked items. When `:boolean` prop is logical true it must
      be a map where each key is a path to item's value (as in `clojure.core/get-in`, but for convenience it can be just
      first element of path when path contains only one element) and its value is an item's value (true/false, but
      logical true/false would also work), otherwise it must be a set of values of checked items.
    - `:widget` - one of :button, :icon (default), :native or their string/symbol equivalents. Specifies how widget
      looks.

  Notes:
  * item path (see `:boolean` prop) is convenient to group multiple boolean fields in one widget, meantime item value
    convenient when single field is a collection of distinct elements
  * `:invalid` prop of group overrides same prop of item
  * `:soft-columns` prop can be convenient in case of small containers with just 2-3 columns"
  [{:keys [disabled invalid item-props items value widget] :as props}]
  (into
    [group-input/widget (assoc props :bem "nw-checkboxGroupInput")]
    (for [{:keys [path] :as item} items]
      [checkbox-group-input-item/widget
       (merge
         item-props
         item
         {:checked
          (if (:boolean props)
            (->> (if (sequential? path) path [path]) (get-in value) boolean)
            (->> item :value (contains? value)))}
         {:disabled disabled
          :invalid invalid
          :widget (-> widget keyword #{:button :icon :native} (or :icon))})])))
