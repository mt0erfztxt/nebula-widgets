(ns nebula-widgets.widgets.button-group-set
  (:require
    [nebula-widgets.widgets.button-group :as button-group]
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-buttons")

(def ^:private custom-props-vec
  "Vector of props that React doesn't allow on `<DIV>` tag plus :class prop because we not allow override CSS class."
  [:cid :class :cns :groups])

(defn- build-class [{:keys [cid cns disabled]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders set of button groups.

  Arguments:
  * `props` - required, map. Supported keys:
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether button group set is disabled or not. When true all button
      groups in set would be disabled.
    - `:groups` - seq of maps, no default. Button groups of set, each map is a props for
      [button-group](/widgets/button-group) widget.
    - any props that React supports for `<DIV>` tag"
  [{:keys [disabled groups] :as props}]
  (into [:div (merge {:class (build-class props)} (apply dissoc props custom-props-vec))]
        (for [group-props groups]
          [button-group/widget (cond-> group-props disabled (assoc :disabled disabled))])))
