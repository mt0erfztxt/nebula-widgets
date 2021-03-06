(ns nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input
  (:require
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.core :as knob]
    [nebula-widgets.widgets.checkable-group-input.core :as checkable-group-input]))

(def ^:private default-cgi-props
  {:columns 5
   :inline true
   :items (for [v [false true]] {:label (str v), :value v})
   :multi-checkable false
   :no-row-gap true
   :widget "radio"})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders interactive example's knob with single selection checkable group input as its input.

  Arguments:
  * `knobs-props` - required, map. See knob/widget for details.
  * `input-props` - optional, map. Props for checkable-group-input/widget, merged with defaults:
    - `:columns` - 5
    - `:inline` - true
    - `:items` - two items to create boolean switch (false and true)
    - `:multi-checkable` - false
    - `:no-row-gap` - true
    - `:widget` - radio"
  [knob-props input-props]
  [knob/widget knob-props checkable-group-input/widget (merge default-cgi-props input-props)])

(defn gen-items [& labels]
  (for [item labels
        :let [simple? (string? item)
              [label value] (if simple? [item] item)]]
    {:label (if (some? label) label "nil")
     :value (cond
              (some? value) value
              (not simple?) nil
              :else label)}))
