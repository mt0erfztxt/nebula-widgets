(ns nebula-widgets.widgets.button.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-button")

(def ^:private custom-props-vec
  "Vector of props that React doesn't allow on `<BUTTON>` tag plus :class prop because we not allow override CSS class."
  [:cid :class :cns :kind :text])

(def ^:private kind-prop-set
  #{:flat :normal :primary :secondary})

(defn- build-class [{:keys [cid cns disabled kind]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["disabled" disabled]
     ["kind" (-> kind keyword kind-prop-set (or :normal))]]))

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
    - `:kind` - one of :flat, :normal (default), :primary, :secondary or their string/symbol equivalents. Allows to
      choose button kind.
    - `:href` - string, no default. When evaluates to logical true button would be rendered using `<A>` tag, otherwise
      it would be rendered using `<BUTTON>` tag.
    - `:text` - renderable, no default. Button's text (content).
    - any props that React supports for `<A>` or `<BUTTON>` tags

  TODO:
  * fix transitions times"
  [{:keys [href text] :as props}]
  [(if href :a :button)
   (merge {:class (build-class props)} (apply dissoc props custom-props-vec))
   text])
