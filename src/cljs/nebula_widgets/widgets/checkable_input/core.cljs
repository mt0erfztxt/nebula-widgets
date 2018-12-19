(ns nebula-widgets.widgets.checkable-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-checkableInput")

(def ^:private input-bem
  (str bem "__input"))

(def ^:private label-bem
  (str bem "__label"))

(def ^:private label-text-bem
  (str label-bem "-text"))

(defn- extract-label [{:keys [label]}]
  (if (map? label) (:text label) label))

(defn- extract-label-props [{:keys [label]}]
  (when (map? label)
    label))

(def ^:private size-prop-set
  #{:large :normal :small})

(def ^:private widget-prop-set
  #{:button :checkbox :radio})

(defn- build-class [{:keys [checked cid cns disabled invalid size widget] :as props}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["checked" checked]
     ["disabled" disabled]
     ["invalid" invalid]
     ["labelShrinked" (-> props extract-label-props :shrinked)]
     ["size" (-> size keyword size-prop-set (or :normal))]
     ["widget" (-> widget keyword widget-prop-set (or :checkbox))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders checkable input.

  Arguments:
  * `props` - map:
    - `:checked` - logical true/false, no default. Whether input is checked or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether input is disabled or not.
    - `:invalid` - logical true/false, no default. Whether input is in invalid state or not.
    - `:label` - string, renderable or map, no default. Input's label. Can be a map to provide more props for label:
      * `:shrinked` - logical true/false, no default. Whether label shrinked (using ellipsis) when too long or not.
      * `:text` - renderable, no default. Label's text. Same value (not map) that can be passed directly to `:label`.
    - `:on-change` - function, no default. Called with browser event as argument when input changes to checked.
    - `:size` - one of :large, :normal (default), :small or their string/symbol equivalents. Widget size.
    - `:widget` - one of :button, :checkbox (default), :radio or their string/symbol equivalents. Specifies how widget
      looks."
  [{:keys [checked disabled on-change] :as props}]
  [:div {:class (build-class props)}
   [:label {:class label-bem}
    [:input
     {:checked (boolean checked)
      :class input-bem
      :disabled (boolean disabled)
      :on-change on-change
      :type "checkbox"}]
    [:span {:class label-text-bem} (extract-label props)]]])
