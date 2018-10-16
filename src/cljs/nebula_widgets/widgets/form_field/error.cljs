(ns nebula-widgets.widgets.form-field.error
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-formField-error")

(defn- build-class [{:keys [cid]}]
  (bem-utils/build-class bem [["cid" cid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form field's error.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - `:cid` - any, no default. Component id.
    - `:text` - renderable, no default. Error message, text, etc."
  [{:keys [text] :as props}]
  [:div {:class (build-class props)} text])
