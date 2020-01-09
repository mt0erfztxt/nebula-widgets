(ns nebula-widgets.widgets.action-group.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.action-group.action :as action]))

(def ^:private bem
  "nw-actionGroup")

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

(defn widget
  "Renders action group.

  Arguments:
  * `props` - optional, map. Supported props:
    - `:actions` - seq of maps and/or renderables, no default. When element is a map, then it used as props to render
      [action-group's action](/nebula-widgets/widgets/action-group-action) widget, otherwise element rendered as-is.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether action is disabled or not. When evaluates to logical true,
      then all actions passed in as map would have their :disabled prop set to `true`
    - `:size` - one of :large, :normal (default) or their string/symbol equivalents. Size of action group, also provides
      (overrides) :size prop of all actions passed in as map."
  [{:keys [actions disabled size] :as props}]
  (let [disabled? (boolean (or disabled (:disabled props)))
        size (-> size keyword size-prop-set (or :normal))]
    (into
      [:div {:class (build-class props)}]
      (for [a actions]
        [:div {:class item-elt-bem}
         (if (map? a)
           [action/widget
            (cond-> (assoc a :size size)
              disabled? (assoc :disabled disabled?))]
           a)]))))
