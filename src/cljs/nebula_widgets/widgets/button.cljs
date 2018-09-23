(ns nebula-widgets.widgets.button
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-button")

(def ^:private custom-props-vec
  "Vector of props that React doesn't allow on `<BUTTON>` tag plus :class prop because we not allow override CSS class."
  [:cid :class :cns :flat :primary :secondary :text])

(defn- build-class [{:keys [cid cns disabled flat primary secondary]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["flat" flat]
     ["primary" primary]
     ["secondary" secondary]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders button.

  Arguments:
  * `props` - required, map. Supported keys:
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether button is disabled or not.
    - `:flat` - logical true/false, no default. Whether button is flat or not.
    - `:href` - string, no default. When evaluates to logical true button would be rendered using `<A>` tag, otherwise
      it would be rendered using `<BUTTON>` tag.
    - `:primary` - logical true/false, no default. Whether button is primary or not.
    - `:secondary` - logical true/false, no default. Whether button is secondary or not.
    - `:text` - renderable, no default. Button's text (content).
    - any props that React supports for `<A>` or `<BUTTON>` tags"
  [{:keys [href text] :as props}]
  [(if href :a :button)
   (merge {:class (build-class props)} (apply dissoc props custom-props-vec))
   text])
