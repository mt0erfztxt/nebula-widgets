(ns nebula-widgets.widgets.checkable-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private default-bem
  "nw-checkableInput")

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-input-bem [bem]
  (str (build-bem bem) "__input"))

(defn- build-label-bem [bem]
  (str (build-bem bem) "__label"))

(defn- build-label-text-bem [bem]
  (str (build-label-bem bem) "-text"))

(def ^:private widget-prop-set
  #{:button :icon :native})

(defn- extract-label [{:keys [label]}]
  (if (map? label) (:text label) label))

(defn- extract-label-props [{:keys [label]}]
  (when (map? label)
    label))

(defn- build-class [{:keys [bem checked cid cns disabled invalid widget] :as props}]
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["checked" checked]
     ["disabled" disabled]
     ["invalid" invalid]
     ["labelShrinked" (-> props extract-label-props :shrinked)]
     ["widget" (-> widget keyword widget-prop-set (or :icon))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders checkable input.

  Not intended to be used directly but rather as a base for more specific checkable input widgets.

  Arguments:
  * `props` - map:
    - `:bem` - string, 'nw-checkableInput' by default. Would be used as widget's BEM. Provided by concrete checkable
      input widget to augment styling.
    - `:checked` - logical true/false, no default. Whether input is checked or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether input is disabled or not.
    - `:input-type` - string, no default. Type of input, e.g. 'checkbox'.
    - `:invalid` - logical true/false, no default. Whether input is in invalid state or not.
    - `:label` - string, renderable or map, no default. Input's label. Can be a map to provide more props for label:
      * `:shrinked` - logical true/false, no default. Whether label shrinked (using ellipsis) when too long or not.
      * `:text` - renderable, no default. Label's text. Same value (not map) that can be passed directly to `:label`.
    - `:on-change` - function, no default. Called with browser event as argument when input changes to checked.
    - `:widget` - one of :button, :icon (default), :native or their string/symbol equivalents. Specifies how widget
      looks."
  [{:keys [bem checked disabled input-type on-change] :as props}]
  [:div {:class (build-class props)}
   [:label {:class (build-label-bem bem)}
    [:input
     {:checked (boolean checked)
      :class (build-input-bem bem)
      :disabled (boolean disabled)
      :on-change on-change
      :type (name input-type)}]
    [:span {:class (build-label-text-bem bem)} (extract-label props)]]])
