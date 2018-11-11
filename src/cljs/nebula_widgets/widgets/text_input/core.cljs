(ns nebula-widgets.widgets.text-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-textInput")

(def ^:private busy-elt-bem
  (str bem "__busy"))

(def ^:private error-elt-bem
  (str bem "__error"))

(def ^:private errors-elt-bem
  (str bem "__errors"))

(def ^:private input-elt-bem
  (str bem "__input"))

(def ^:private custom-props-set
  #{:busy :cid :cns :errors :invalid :multi-line :size :text-alignment})

(defn- build-class [{:keys [busy cid cns disabled invalid multi-line size text-alignment]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["busy" busy]
     ["disabled" disabled]
     ["invalid" invalid]
     ["multi-line" multi-line]
     ["size" (-> size keyword #{:large :normal :small} (or :normal))]
     ["textAlignment" (-> text-alignment keyword #{:center :left :right} (or :left))]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders text input.

  Arguments:
  * `props` - map, no default. Supported keys:
    - `:busy` - logical true/false, no default. Whether to show busy indicator or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether widget disabled or not.
    - `:errors` - seq of strings, no default. Would be displayed only when not empty and `:invalid`.
    - `:invalid` - logical true/false, no default. Whether `:value` is valid or not.
    - `:multi-line` - logical true/false, no default. Whether widget rendered using `TEXTAREA` or `INPUT` tag.
    - `:size` - one of :large, :normal (default), :small or their string/symbol equivalents. Widget size.
    - `:text-alignment` - one of `:center`, `:left` (default), `:right` or their string/symbol equivalents. Allows to set
      text alignment.
    - any other props that React supports on `INPUT` (or `TEXTAREA` when `:multi-line`) tag."
  [{:keys [disabled errors invalid multi-line] :as props}]
  [:div {:class (build-class props)}
   [(if multi-line :textarea :input)
    (cond->
      (merge {:class input-elt-bem} (apply dissoc props :class custom-props-set))
      disabled (assoc :disabled disabled))]
   [:div {:class busy-elt-bem}
    [:i.fa.fa-circle-o-notch.fa-spin]]
   (when (and invalid (seq errors))
     (into
       [:ul {:class errors-elt-bem}]
       (for [error errors]
         [:li {:class error-elt-bem} error])))])
