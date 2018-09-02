(ns nebula-widgets.widgets.group-input.item
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private default-bem
  "nw-groupInput-item")

(def ^:private non-input-props
  [:cid :cns :label :path :shrink-label :widget])

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-input-bem [bem]
  (str (build-bem bem) "__input"))

(defn- build-label-bem [bem]
  (str (build-bem bem) "__label"))

(defn- build-label-text-bem [bem]
  (str (build-label-bem bem) "-text"))

(defn- build-class [{:keys [bem checked cid cns disabled invalid shrink-label widget]}]
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["checked" checked]
     ["disabled" disabled]
     ["invalid" invalid]
     ["shrinkLabel" shrink-label]
     ["widget" widget]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders item of group input. Not intended to be used directly but rather as base for item of more specific group
  input widgets.
  Arguments:
  props - required, map:
  * :bem  - string, nw-groupInput-item by default. Would be used as widget's BEM.
  * :checked - logical true/false, no default. Whether item is checked or not.
  * :cid - any, no default. Component id.
  * :cns - any, no default. Component namespace.
  * :disabled - logical true/false, no default. Whether item is disabled or not.
  * :invalid - logical true/false, no default.  Whether item has errors or not.
  * :shrink-label - logical true/false, no default. Whether to shrink long label (ellipsis) or not.
  * :widget - any, no default. Widget visual look, see concrete group input item implementation for details.
  input-cmp - required, any component, e.g :input.
  input-cmp-props - required, map, props for :input-cmp. Any React supported props can be passed here."
  [{:keys [bem label] :as props} input-cmp input-cmp-props]
  (let [input-hcp [input-cmp (-> (apply dissoc input-cmp-props non-input-props) (assoc :class (build-input-bem bem)))]]
    [:div {:class (build-class props)}
     (if label
       [:label {:class (build-label-bem bem)} input-hcp [:span {:class (build-label-text-bem bem)} label]]
       input-hcp)]))
