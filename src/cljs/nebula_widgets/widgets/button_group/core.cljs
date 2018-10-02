(ns nebula-widgets.widgets.button-group.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.button.core :as button]))

(def ^:private bem
  "nw-buttonGroup")

(def custom-props-vec
  "Vector of props that React doesn't allow on `<DIV>` tag plus :class prop because we not allow override CSS class."
  [:alignment :buttons :cid :class :cns])

(defn- build-class [{:keys [alignment cid cns disabled]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["alignment" (-> alignment keyword #{:center :left :right} (or :center))]
     ["disabled" disabled]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of buttons.

  Arguments:
  * `props` - required, map. Supported keys:
    - `:alignment` - one of :center (default), :left, :right or their string/symbol equivalents. Specifies group
      alignment.
    - `:buttons` - seq of maps, no default. Group buttons, each map is a props for [button](/widgets/button) widget.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether button group is disabled or not. When true all buttons in
      group would be disabled.
    - any props that React supports for `<DIV>` tag

  Notes:
  * alignment implemented through parent's CSS, so parent must have 'text-align' set to 'center' and 'position' set to
    'relative' or something"
  [{:keys [buttons disabled] :as props}]
  (into [:div (merge {:class (build-class props)} (apply dissoc props custom-props-vec))]
        (for [button-props buttons]
          [button/widget (cond-> button-props disabled (assoc :disabled disabled))])))
