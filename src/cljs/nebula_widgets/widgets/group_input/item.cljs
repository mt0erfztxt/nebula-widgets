(ns nebula-widgets.widgets.group-input.item
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem "nw-groupInput-item")
(def ^:private bem-input (str bem "__input"))
(def ^:private bem-label (str bem "__label"))
(def ^:private bem-label-text (str bem-label "-text"))

(def ^:private non-input-props [:cid :cns :label :path :widget])

(defn- build-class [{:keys [checked cid cns disabled invalid widget]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["checked" checked]
     ["disabled" disabled]
     ["invalid" invalid]
     ["widget" widget]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Maybe errors rendering is a responsibility of input component (see :input-cmp prop)?
;;       Having invalid on item is convenient in UI testing.
(defn widget
  "props          - required, map:
    :checked        - optional, logical true/false, no default
    :cid            - optional, any, no default, component id
    :cns            - optional, any, no default, component namespace
    :disabled       - optional, logical true/false, no default
    :invalid        - optional, logical true/false, no default
    :widget         - optional, any, item widget, see concrete group input item implementation for details
  input-cmp       - required, any component, e.g :input
  input-cmp-props - required, map, props for :input-cmp, any React supported props can be passed here"
  [{:keys [label] :as props} input-cmp input-cmp-props]
  (let [input-hcp [input-cmp (-> (apply dissoc input-cmp-props non-input-props) (assoc :class bem-input))]]
    [:div {:class (build-class props)}
     (if label
       [:label {:class bem-label} input-hcp [:span {:class bem-label-text} label]]
       input-hcp)]))
