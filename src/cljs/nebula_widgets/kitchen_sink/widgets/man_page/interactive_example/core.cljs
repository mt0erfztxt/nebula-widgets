(ns nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core)

(def ^:private bem
  "manPage-interactiveExample")

(def ^:private knob-elt-bem
  (str bem "__knob"))

(def ^:private knobs-elt-bem
  (str bem "__knobs"))

(def ^:private knobs-header-elt-bem
  (str bem "__knobs-header"))

(def ^:private knobs-headers-elt-bem
  (str bem "__knobs-headers"))

(def ^:private view-elt-bem
  (str bem "__view"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders interactive example.

  Arguments:
  * `subject` - required, renderable. A subject which behaviours must be demonstrated.
  * `& knobs` - optional, seq of renderables. Knobs used to demonstrate subject's behaviors."
  [subject & knobs]
  [:div {:class bem}
   [:div {:class view-elt-bem} subject]
   (into
     [:div {:class knobs-elt-bem}
      [:div {:class knobs-headers-elt-bem}
       [:div {:class knobs-header-elt-bem} "Prop"]
       [:div {:class knobs-header-elt-bem} "Value"]]]
     (for [knob knobs]
       [:div {:class knob-elt-bem} knob]))])
