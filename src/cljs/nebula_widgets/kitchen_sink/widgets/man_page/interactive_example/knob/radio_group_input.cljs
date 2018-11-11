(ns nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.radio-group-input
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.core :as knob]
    [nebula-widgets.widgets.radio-group-input.core :as radio-group-input]))

(def ^:private default-rgi-props
  {:columns 8
   :inline true
   :items (for [v [false true]] {:label (str v), :value v})
   :no-row-gap true})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders interactive example's knob with radio group input as its input.

  Arguments:
  * `knobs-props` - required, map. See knob/widget for details.
  * `rgi-props` - optional, map. Props for radio-group-input/widget, merged with defaults:
    - `:columns` - 8
    - `:inline` - true
    - `:items` - two items to create boolean switch (false and true)
    - `:no-row-gap` - true"
  [knob-props rgi-props]
  [knob/widget knob-props radio-group-input/widget (merge default-rgi-props rgi-props)])
