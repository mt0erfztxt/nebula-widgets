(ns nebula-widgets.widgets.toolbar.action-panel.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.toolbar.action-panel.action :as action]))

(def ^:private bem
  "nw-actionPanel")

(def ^:private item-elt-bem
  (str bem "__item"))

(def ^:private size-prop-set
  #{:normal :large})

(defn- build-class [{:keys [cid cns disabled size]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["size" size]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Update docs
(defn widget
  "Component that displays action panel. Accepts `props` map:
  * `:cid` - optional, no default. Anything that can be used as component id.
  * `:cns` - optional, no default. Anything that can be used as component ns.
  * `:disabled` - optional, boolean, no default. When evaluates to logical true
    then action panel and all its items passed in as maps would be disabled.
  * `:font-size` - optional, one of `:large`, `:normal`, `:small` or their
    string/symbol equivalents, `:normal` by default. Allows to set font size
    used in widget. Note that it would be passed down to item widgets.
  * `:item-props` - optional, map, no default. When set each item component's
    props would be merged into this map.
  * `:items` - optional, seq of items, no default. Each item can be anything
    that Reagent can render or a map. When it's a map it's must have a `:type`
    key that specifies one of predefined component types - `:button`,
    `:button-set`, `:separator` or their string, or symbol equivalents. When
    type is `:button` then map must be a props map for `action-panel-item`
    component, when type is `:button-set` then map must be a props map for
    `action-panel-item-set` component.
  * `:size` - optional, one of `:large`, `:normal`, `:small` or their
    string/symbol equivalents, `:normal` by default. Allows to set widget size.
    Note that it would be passed down to item widgets.
  * `:stacked?` - optional, boolean, no default. When evaluates to logical true
    then widget would have items placed one under another instead of one after
    another."
  [{:keys [actions disabled size] :as props}]
  (let [disabled? (boolean (or disabled (:disabled props)))
        size (-> size keyword size-prop-set (or :normal))]
    (into
      [:div {:class (build-class props)}]
      (for [a actions]
        [:div {:class item-elt-bem}
         (if (map? a)
           [action/widget (merge a {:disabled disabled?, :size size})]
           a)]))))
