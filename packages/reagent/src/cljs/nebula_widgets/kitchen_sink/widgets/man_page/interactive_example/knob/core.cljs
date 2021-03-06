(ns nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "manPage-interactiveExample-knob")

(def ^:private input-elt-bem
  (str bem "__input"))

(def ^:private label-elt-bem
  (str bem "__label"))

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders interactive example's knob.

  Arguments:
  * `props` - required, map. Supported keys:
    - `:cid` - optional, any, no default. Component id. Would be used as value for `:label` prop when last is not set
      (except for separator case), when it's a :- then separator would be rendered.
    - `:label` - optional, string, no default (but see `:cid` prop). A knob's label.
  * `input-cmp` - required, component. Knob's input.
  * `input-cmp-props` - required, map. Props for knob's input."
  [{:keys [cid label] :as props} input-cmp input-cmp-props]
  (let [[label text] (if (= :- cid) ["-" label] [(or label (str cid))])]
    [:div {:class (build-class props)}
     [:div {:class label-elt-bem} label]
     [:div {:class input-elt-bem}
      (or text [input-cmp input-cmp-props])]]))
