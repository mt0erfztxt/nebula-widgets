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

;; Text group input's `:on-change` called with following map:
;; * `:item` - item that cause on-change to trigger, map:
;;   - `:action` - one of :change, insert or :remove
;;   - `:idx` - item's index
;;   - `:value` - item's value
;; * `:value` - new composite (from all items) value
;;
;; Example:
;; [{:item {:action :remove, :idx 0, :value "a"}
;;   :value ["b" "c"]}
;;  "browser-event"]

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of text inputs.

  FIX:
  * `:disabled` disables only actions, but not input

  TODO:
  * handle Ctrl+Del/Ins in text input to remove/insert items from keyboard"
  [{:keys [disabled item-props items on-change] :as props}]
  (let [value (->> items (map :value) vec)]
    [group-input/widget
     (-> props
         (assoc
           :bem "nw-textGroupInput"
           :item-widget text-input/widget
           :items
           (map-indexed
             (fn [idx item]
               (let [disabled? (if disabled disabled (:disabled item))]
                 (-> item-props
                     (merge item)
                     (add-actions idx value (assoc props :disabled disabled?))
                     (assoc :on-change (r/partial handle-item-on-change idx on-change value))
                     (dissoc :insert-allowed :remove-allowed))))
             items))
         (dissoc :item-props))]))
