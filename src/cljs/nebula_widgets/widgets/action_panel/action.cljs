(ns nebula-widgets.widgets.action-panel.action
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-actionPanel-action")

(def ^:private icon-elt-bem
  (str bem "__icon"))

(def ^:private text-elt-bem
  (str bem "__text"))

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
     ["size" size]]))

(def ^:private props-vec
  [:accented :active :cid :class :cns :font-size :icon :reversed :text :type])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Update docs
(defn widget
  "Component that displays action panel item. Accepts `props` map:
  * `:accented?` - optional, boolean, no default. When evaluates to logical
    true then item would be rendered accented.
  * `:active?` - optional, boolean, no default. When evaluates to logical true
    then item would be rendered highlighted.
  * `:checked` - optional, boolean, no default. When evaluates to logical true
    then item would be rendered as checked.
  * `:cid` - optional, no default. Anything that can be used as component id.
  * `:cns` - optional, no default. Anything that can be used as component ns.
  * `:disabled` - optional, boolean, no default. When evaluates to logical true
    then item would be disabled.
  * `:font-size` - optional, one of `:large`, `:normal`, `:small` or their
    string/symbol equivalents, `:normal` by default. Allows to set font size
    used in widget.
  * `:href` - optional, string, no default. When set item would be rendered
    using `<A>` tag, otherwise it would be rendered as `<BUTTON>` tag.
  * `:icon` - optional, string, no default. Icon from FontAwesome set but
    without 'fa-' prefix.
  * `:no-frame-on-hover?` - optional, boolean, no default. When evaluates to
    logical true then item would't have frame on hover.
  * `:size` - optional, one of `:large`, `:normal`, `:small` or their
    string/symbol equivalents, `:normal` by default. Allows to set widget size.
  * `:stacked?` - optional, boolean, no default. When evaluates to logical true
    then item is in stacked action panel.
  * `:text` - optional, something renderable, no default. Item text.
  * Any props that React supports on `<A>` or `<BUTTON>` tags."
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
