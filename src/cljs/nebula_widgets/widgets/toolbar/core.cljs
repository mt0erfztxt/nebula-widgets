(ns nebula-widgets.widgets.toolbar.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.action-group.core :as action-group]))

(def ^:private bem
  "nw-toolbar")

(def ^:private partition-elt-bem
  (str bem "__partition"))

(def ^:private size-prop-set
  #{:normal :large})

(defn- build-class [{:keys [cid cns disabled size]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["size" size]]))

(defn- partition-elt-cmp [{:keys [alignment disabled size] :as props}]
  (let [disabled? (boolean (or disabled (:disabled props)))]
    (into
      [:div
       {:class
        (bem-utils/build-class
          partition-elt-bem
          [["alignment" alignment]
           ["disabled" disabled?]])}]
      (for [ap (:action-groups props)]
        [action-group/widget (merge ap {:disabled disabled?, :size size})]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders toolbar.

  Arguments:
  * `props` - optional, map. Supported props:
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether toolbar is disabled or not. When evaluates to logical true,
      then all partitions would have their :disabled prop set to `true`. Also passed to :disabled prop of action-groups.
    - `:partitions` - map, no default. Supported keys are :left and :right - a map to provide action groups for toolbar,
      See [action-group](/widgets/action-group) for details.
    - `:size` - one of :large, :normal (default) or their string/symbol equivalents. Size of toolbar, also passed to
      :size prop of action-groups."
  [{:keys [disabled partitions size] :as props}]
  (let [disabled? (boolean disabled)
        size (-> size keyword size-prop-set (or :normal))]
    (into
      [:div {:class (build-class (assoc props :size size))}]
      (for [[a p] (->> [:left :right] (map #(vector % (get partitions %))) (filter second))]
        [partition-elt-cmp (merge p {:alignment a, :disabled disabled?, :size size})]))))
