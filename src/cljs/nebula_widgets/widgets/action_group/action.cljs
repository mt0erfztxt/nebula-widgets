(ns nebula-widgets.widgets.action-group.action
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-actionGroup-action")

(def ^:private icon-elt-bem
  (str bem "__icon"))

(def ^:private text-elt-bem
  (str bem "__text"))

(def ^:private size-prop-set
  #{:normal :large})

(defn- build-class [{:keys [accented active cid cns disabled font-size reversed size]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["accented" accented]
     ["active" active]
     ["disabled" disabled]
     ["font-size" font-size]
     ["reversed" reversed]
     ["size" (-> size keyword size-prop-set (or :normal))]]))

(def ^:private props-vec
  [:accented :active :cid :class :cns :font-size :icon :reversed :text :type])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders action of [action-group](/widgets/action-group).

  Arguments:
  * `props` - optional, map. Supported props:
    - `:accented` - logical true/false, no default. Whether action is accented or not.
    - `:active` - logical true/false, no default. Whether action is active or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether action is disabled or not.
    - `:href` - string, no default. When evaluates to logical true action would be rendered using `<A>` tag, otherwise
      it would be rendered using `<BUTTON>` tag.
    - `:icon` - string, no default. When evaluates to logical true action would an icon. Must be one from FontAwesome 4
      icon set but without 'fa-' prefix.
    - `:reversed` - logical true/false, no default. Whether action's text rendered before icon or not.
    - `:size` - one of :large, :normal (default) or their string/symbol equivalents. Size of action.
    - `:text` - renderable, no default. Actions's text."
  [{:keys [disabled href icon reversed text] :as props}]
  (let [a? (and (not disabled) href)]
    (into
      [(if a? :a :button)
       (cond-> (merge {:class (build-class props)} (apply dissoc props props-vec))
         (not a?) (assoc :type "button"))]
      (cond-> []
        icon (conj [:span {:class icon-elt-bem} [:i {:class (str "fa fa-fw fa-" icon)}]])
        text (conj [:span {:class text-elt-bem} text])
        reversed (reverse)))))
