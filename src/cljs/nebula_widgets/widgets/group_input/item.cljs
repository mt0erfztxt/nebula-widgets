(ns nebula-widgets.widgets.group-input.item
  (:require [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem "nw-groupInput-item")
(def ^:private bem-error (str bem "-error"))
(def ^:private bem-errors (str bem "__errors"))
(def ^:private bem-label (str bem "__label"))

(defn- build-class [{:keys [checked cid cns disabled ::invalid? widget]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["checked" checked]
     ["disabled" disabled]
     ["invalid" invalid?]
     ["widget" widget]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def custom-props
  "Vector of props not supported by React but that used in `group-input-item` component."
  [:checked :cid :cns :disabled :label :path :widget])

(def non-input-props
  "Vector of props that must not be used in `group-input-item` input component."
  [:cid :cns :label :path :widget])

;; TODO: Maybe errors rendering is a responsibility of input (see :input prop)?
(defn widget
  "props - required, map:
    :checked` - optional, logical true/false, no default
    :cid      - optional, any, no default, component id
    :cns      - optional, any, no default, component namespace
    :disabled - optional, logical true/false, no default
    :widget   - optional, any, item widget, see concrete group input item implementation for details
  input  - required, renderable"
  [{:keys [errors label] :as props} input]
  (let [invalid? (boolean (and errors (seq errors)))]
    [:div {:class (-> props (assoc ::invalid? invalid?) build-class)}
     (if label
       [:label {:class bem-label} input label]
       input)
     (when invalid?
       (into [:ul {:class bem-errors}]
             (for [error errors] [:li {:class bem-error} error])))]))
