(ns nebula-widgets.widgets.checkbox-input.core
  (:require
    [nebula-widgets.widgets.checkable-input.core :as checkable-input]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders checkbox input.

  Arguments:
  * `props` - map. Same as in [checkable-input](/widgets/checkable-input) widget, plus:
    - `:bem` - forcibly set to 'nw-checkboxInput'
    - `:input-type` - forcibly set to 'checkbox'"
  [props]
  [checkable-input/widget
   (assoc props :bem "nw-checkboxInput" :input-type "checkbox")])
