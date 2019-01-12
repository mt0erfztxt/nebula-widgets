(ns nebula-widgets.widgets.form.core
  (:require
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.button-group-set.core :as button-group-set]))

(def ^:private bem
  "nw-form")

(def ^:private buttons-bem
  (str bem "__buttons"))

(def ^:private fields-bem
  (str bem "__fields"))

(def ^:private title-bem
  (str bem "__title"))

(defn- build-class [{:keys [cid cns disabled invalid]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["invalid" invalid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders form.

  Arguments:
  * `props` - map:
    - `:buttons` - map, same as `props` argument of [button-group-set](/widgets/button-group-set) widget, no default.
      Used to render form buttons.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether input is disabled or not.
    - `:invalid` - logical true/false, no default. Whether input is in invalid state or not.
    - `:title` - string, no default. Form's title.
  * `& children` - any number of renderables (e.g. form fields)"
  [{:keys [buttons form-props title] :as props} & children]
  [:form
   (merge
     {:class (build-class props)
      :method "post"
      :on-submit utils/prevent-event-default}
     (dissoc form-props :class))
   (when title
     [:div {:class title-bem} title])
   (into [:div {:class fields-bem}] children)
   [:div {:class buttons-bem}
    [button-group-set/widget buttons]]])
