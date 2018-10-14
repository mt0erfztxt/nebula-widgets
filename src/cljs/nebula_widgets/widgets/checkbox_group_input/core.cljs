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
      be a map where each key is an item path and its value is an item value, otherwise it must be a set of values of
      checked items.
    - `:widget` - one of :button, :icon (default), :native or their string/symbol equivalents. Specifies how widget
      looks."
  [{:keys [disabled item-props items value widget] :as props}]
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
          :widget (-> widget keyword #{:button :icon :native} (or :icon))})])))
