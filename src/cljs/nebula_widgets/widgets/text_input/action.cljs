(ns nebula-widgets.widgets.text-input.action
  (:require
    [nebula-widgets.utils.bem :as bem-utils]
    [nebula-widgets.widgets.text-input.common :as common]))

(def ^:private custom-props-set
  #{:cid :cns :content :direction :icon :invalid})

(def ^:private bem
  "nw-textInput-action")

(def ^:private content-elt-bem
  (str bem "__content"))

(def ^:private icon-elt-bem
  (str bem "__icon"))

(def ^:private direction-prop-set
  #{:horizontal :vertical})

(defn- build-class [{:keys [cid cns direction disabled icon invalid size]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" (or icon cid)]
     ["direction" (-> direction keyword direction-prop-set (or :horizontal))]
     ["disabled" disabled]
     ["invalid" invalid]
     ["size" (common/get-size-prop size)]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders action for text input.

  Arguments:
  * `props` - map:
    - `:cid` - any, no default. Component id. Required when `:icon` not provided, see `:icon` for details.
    - `:cns` - any, no default. Component namespace.
    - `:content` - renderable, no default. It would be rendered after action's icon.
    - `:direction` - one of :horizontal (default), :vertical or their string/symbol equivalents. Used for proper styling
      text input widget depending on it's multi-line prop.
    - `:disabled` - logical true/false, no default. Whether widget disabled or not.
    - `:icon` - string, no default. Icon from FontAwesome set but without 'fa-' prefix. Used as a key for React
      component, when not provided a `:cid` prop must be set.
    - `:invalid` - logical true/false, no default. Must be set to same value as in text input for correct styling.
    - any other props that React supports on `DIV` tag"
  [{:keys [content icon] :as props}]
  [:div (merge {:class (build-class props)} (apply dissoc props :class custom-props-set))
   (when icon
     [:div {:class icon-elt-bem}
      [:i {:class (str "fa fa-" icon)}]])
   (when content
     [:div {:class content-elt-bem} content])])
