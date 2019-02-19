(ns nebula-widgets.widgets.toolbar.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.toolbar.action-panel.core :as action-panel]))

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
      (for [ap (:action-panels props)]
        [action-panel/widget (merge ap {:disabled disabled?, :size size})]))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Update docs
(defn widget
  "Component that displays action bar. Actually it's just a new version of
  `toolbar` widget but old version is still in use so we make a new name. Accepts
  `props` map:
  * `:cid` - optional, no default. Anything that can be used as component id.
  * `:cns` - optional, no default. Anything that can be used as component ns.
  * `:disabled` - optional, boolean, no default. When evaluates to logical true
    then action bar and all its partitions, groups and items would be disabled.
  * `:partitions` - optional, seq of maps, no default. Used to display
    partitions inside action bar. Each item of seq is a `props` map:
    - `:alignment` - optional, one of `:left`, `:right` or their string, or
      symbol equivalents, `:left` by default. Sets alignment of partition.
    - `:disabled` - optional, boolean, no default. When evaluates to logical
      true then partition and all its groups and items would be disabled.
    - `:groups` - optional, seq of maps, no default. Used to display groups
      inside partition. Each item of seq is a `props` map:
      * `:disabled` - optional, boolean, no default. When evaluates to logical
        true then group and all its items would be disabled.
      * `:items` - optional, seq of items, no default. Each item can be anything
        that Reagent can render or a map. When it's a map it's must be props map
        for `action-panel` widget.
  * `:size` - optional, one of `:large`, `:normal`, `:small` or their string, or
    symbol equivalents, `:normal` by default. Allows to set size of action bar."
  [{:keys [disabled partitions size] :as props}]
  (let [disabled? (boolean disabled)
        size (-> size keyword size-prop-set (or :normal))]
    (into
      [:div {:class (build-class (assoc props :size size))}]
      (for [[a p] (->> [:left :right] (map #(vector % (get partitions %))) (filter second))]
        [partition-elt-cmp (merge p {:alignment a, :disabled disabled?, :size size})]))))
