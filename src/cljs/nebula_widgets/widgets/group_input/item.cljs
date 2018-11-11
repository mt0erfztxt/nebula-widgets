(ns nebula-widgets.widgets.group-input.item
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private default-bem
  "nw-groupInput-item")

(def ^:private non-input-props
  [:cid :cns :label :path :label :widget])

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-input-bem [bem]
  (str (build-bem bem) "__input"))

(defn- build-label-bem [bem]
  (str (build-bem bem) "__label"))

(defn- build-label-text-bem [bem]
  (str (build-label-bem bem) "-text"))

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
     ["widget" widget]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders item of [group-input](/widgets/group-input) widget.

  Not intended to be used directly but rather as a base for item of more specific group input widgets.

  Arguments:
  * `props` - required, map. Supported keys:
    - `:bem`  - string, nw-groupInput-item by default. Would be used as widget's BEM.
    - `:checked` - logical true/false, no default. Whether item is checked or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether item is disabled or not.
    - `:invalid` - logical true/false, no default. Whether item has errors or not.
    - `:label` - string, renderable or map, no default. Item's label. Can be a map to provide more props for label:
      * `:shrinked` - logical true/false, no default. Whether label shrinked (using ellipsis) when too long or not.
      * `:text` - string, renderable, no default. Label's text. Same value (not map) that can be passed directly to :label.
    - `:widget` - any, no default. Widget visual look, see concrete group input item implementation for details.
  * `input-cmp` - required, any component
  * `input-cmp-props` - required, map. Props for component passed as :input-cmp. Any React supported props can be passed
    here."
  [{:keys [bem] :as props} input-cmp input-cmp-props]
  (let [input-hcp [input-cmp (-> (apply dissoc input-cmp-props non-input-props) (assoc :class (build-input-bem bem)))]
        label (extract-label props)]
    [:div {:class (build-class props)}
     (if label
       [:label {:class (build-label-bem bem)}
        input-hcp
        [:span {:class (build-label-text-bem bem)} label]]
       input-hcp)]))
