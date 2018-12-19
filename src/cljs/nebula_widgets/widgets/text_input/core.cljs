(ns nebula-widgets.widgets.text-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.text-input.action :as action]
    [nebula-widgets.widgets.text-input.common :as common]))

(def ^:private custom-props-set
  #{:actions :busy :cid :cns :errors :invalid :multi-line :size :text-alignment})

(def ^:private bem
  "nw-textInput")

(def ^:private actions-elt-bem
  (str bem "__actions"))

(def ^:private body-elt-bem
  (str bem "__body"))

(def ^:private busy-elt-bem
  (str bem "__busy"))

(def ^:private error-elt-bem
  (str bem "__error"))

(def ^:private errors-elt-bem
  (str bem "__errors"))

(def ^:private input-elt-bem
  (str bem "__input"))

(def ^:private input-container-elt-bem
  (str input-elt-bem "Container"))

(def ^:private text-alignment-prop-set
  #{:center :left :right})

(defn- build-class [{:keys [busy cid cns disabled invalid multi-line size text-alignment]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["busy" busy]
     ["disabled" disabled]
     ["invalid" invalid]
     ["multiLine" multi-line]
     ["size" (common/get-size-prop size)]
     ["textAlignment" (-> text-alignment keyword text-alignment-prop-set (or :left))]]))

(defn- actions-elt-cmp [{:keys [actions disabled invalid multi-line]} placement]
  (let [placement (common/get-placement-prop placement)
        actions (get actions placement)]
    (when actions
      [:div {:class (bem-utils/build-class actions-elt-bem [["placement" placement]])}
       (for [{:keys [cid icon] :as action-props} actions]
         ^{:key (or icon cid)}
         [action/widget
          (cond-> (assoc action-props :direction (if multi-line :vertical :horizontal))
            (true? disabled) (assoc :disabled disabled)
            (true? invalid) (assoc :invalid invalid))])])))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders text input.

  Arguments:
  * `props` - map:
    - `:actions` - map, no default. Action for text input:
      * `:after` - seq of maps, no default. Actions to render after text input. Each map is a props for
        [text-input.action](/widgets/text-input-action)
      * `:before` - seq of maps, no default. Actions to render before text input. Each map is a props for
        [text-input.action](/widgets/text-input-action)
    - `:busy` - logical true/false, no default. Whether to show busy indicator or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether widget disabled or not.
    - `:errors` - seq of strings, no default. Would be displayed only when not empty and `:invalid`.
    - `:invalid` - logical true/false, no default. Whether input's value is valid or not.
    - `:multi-line` - logical true/false, no default. Whether widget rendered using `TEXTAREA` or `INPUT` tag.
    - `:size` - one of :large, :normal (default), :small or their string/symbol equivalents. Widget size.
    - `:text-alignment` - one of :center, :left (default), :right or their string/symbol equivalents. Allows to set text
      alignment.
    - any other props that React supports on `INPUT` (or `TEXTAREA` when `:multi-line`) tag

  TODO:
  * change styling of disabled widget because now it visually indistinguishable of enabled one"
  [{:keys [disabled errors invalid multi-line] :as props}]
  [:div {:class (build-class props)}
   [:div {:class body-elt-bem}
    [actions-elt-cmp props :before]
    [:div {:class input-container-elt-bem}
     [(if multi-line :textarea :input)
      (cond-> (merge {:class input-elt-bem} (apply dissoc props :class custom-props-set))
        disabled (assoc :disabled disabled))]
     [:div {:class busy-elt-bem}
      [:i.fa.fa-circle-o-notch.fa-spin]]]
    [actions-elt-cmp props :after]]
   (when (and invalid (seq errors))
     (into
       [:ul {:class errors-elt-bem}]
       (for [error errors]
         [:li {:class error-elt-bem} error])))])
