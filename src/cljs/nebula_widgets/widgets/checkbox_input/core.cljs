(ns nebula-widgets.widgets.checkbox-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-checkboxInput")

(def ^:private input-bem
  (str bem "__input"))

(def ^:private label-bem
  (str bem "__label"))

(def ^:private label-text-bem
  (str label-bem "-text"))

(def ^:private widget-prop-set
  #{:button :icon :native})

(defn- extract-label [{:keys [label]}]
  (if (map? label) (:text label) label))

(defn- extract-label-props [{:keys [label]}]
  (when (map? label)
    label))

(defn- build-class [{:keys [checked cid cns disabled invalid widget] :as props}]
  (bem-utils/build-class
    bem
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

(defn widget [{:keys [checked disabled on-change] :as props}]
  [:div {:class (build-class props)}
   [:label {:class label-bem}
    [:input
     {:checked (boolean checked)
      :class input-bem
      :disabled (boolean disabled)
      :on-change on-change
      :type "checkbox"}]
    [:span {:class label-text-bem} (extract-label props)]]])
