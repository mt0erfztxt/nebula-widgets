(ns nebula-widgets.widgets.text-group-input.core
  (:require
    [nebula-widgets.utils :as u]
    [nebula-widgets.widgets.group-input.core :as group-input]
    [nebula-widgets.widgets.text-input.core :as text-input]
    [reagent.core :as r]))

(defn handle-insert-action-on-click [idx on-change disabled value event]
  (when-not disabled
    (let [[h t] (split-at (inc idx) value)]
      (on-change
        {:event event
         :item {:action :insert, :idx (inc idx), :value ""}
         :value (vec (concat h [""] t))}))))

(defn handle-remove-action-on-click [idx on-change disabled value event]
  (when-not disabled
    (let [h (subvec value 0 idx)
          t (subvec value (inc idx))]
      (on-change
        {:event event
         :item {:action :remove, :idx idx, :value (nth value idx)}
         :value (vec (concat h t))}))))

(defn- add-actions [{:keys [insert-allowed remove-allowed] :as item-props} idx value {:keys [disabled on-change]}]
  (assoc item-props
    :actions
    {:after
     (for [[icon handler allowed?]
           [["plus" handle-insert-action-on-click insert-allowed]
            ["trash" handle-remove-action-on-click remove-allowed]]
           :let [disabled? (if disabled disabled (false? allowed?))]]
       {:disabled disabled?
        :icon icon
        :on-click (r/partial handler idx on-change disabled? value)})}))

(defn- handle-item-on-change [idx on-change value event]
  (let [v (u/event->value event)]
    (on-change
      {:event event
       :item {:action :change, :idx idx, :value v}
       :value (assoc value idx v)})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of text inputs.

  Arguments:
  * `props` - map. Same as in [group-input](/nebula-widgets/widgets/group-input) widget, plus:
  * `:items` - seq of maps. Same as in [group-input](/nebula-widgets/widgets/group-input) widget, plus:
    - `:actions` - overridden so text input have two actions - insert and remove
    - `:insert-allowed` - logical true/false, true by default. Insert action is disabled when boolean false
    - `:remove-allowed` - logical true/false, true by default. Remove action is disabled when boolean false
  * `:multi-line` - logical true/false, no default. Used to choose whether text or textarea input would be used.
    Overrides same prop passed to any item in `:items`.
  * `:on-change` - function, no default. When value of any text input in group is changed or new item inserted/removed
    it would be called with two arguments:
    1. a map:
      * `:item` - describes item that cause `:on-change` to trigger, map:
        - `:action` - one of :change, :insert or :remove
        - `:idx` - item index
        - `:value` - item value
      * `:value` - new composite (composed from all items) value
    2. a browser event object - in case when `:action` in first argument is :change it's an event object from field
       on-change, otherwise it's an event object from on-click of insert or remove action

  TODO:
  * handle Ctrl+Del/Ins in text input to remove/insert items using keyboard"
  [{:keys [disabled item-props items multi-line on-change] :as props}]
  (let [multi-line? (boolean multi-line)
        value (->> items (map :value) vec)]
    [group-input/widget
     (-> props
         (assoc
           :bem "nw-textGroupInput"
           :group-custom-props {"multiLine" multi-line?, "widget" (if multi-line? "textarea" "text")}
           :item-widget text-input/widget
           :items
           (map-indexed
             (fn [idx item]
               (let [disabled? (if disabled disabled (:disabled item))]
                 (-> item-props
                     (merge item {:disabled disabled?, :multi-line multi-line?})
                     (add-actions idx value (assoc props :disabled disabled?))
                     (assoc :on-change (r/partial handle-item-on-change idx on-change value))
                     (dissoc :insert-allowed :remove-allowed))))
             items))
         (dissoc :item-props))]))
