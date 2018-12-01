(ns nebula-widgets.widgets.radio-input.core
  (:require
    [nebula-widgets.widgets.checkable-input.core :as checkable-input]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders radio input.

  Arguments:
  * `props` - map. Same as in [checkable-input](/widgets/checkable-input) widget, plus:
    - `:bem` - forcibly set to 'nw-radioInput'
    - `:input-type` - forcibly set to 'radio'"
  [props]
  [checkable-input/widget
   (assoc props :bem "nw-radioInput" :input-type "radio")])
