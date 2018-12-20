(ns nebula-widgets.widgets.group-input.core
  (:require
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private default-bem
  "nw-groupInput")

(defn- build-bem [bem]
  (or bem default-bem))

(defn- build-error-elt-bem [bem]
  (str (build-bem bem) "__error"))

(defn- build-errors-elt-bem [bem]
  (str (build-bem bem) "__errors"))

(defn- build-inner-elt-bem [bem]
  (str (build-bem bem) "__inner"))

(defn- build-item-elt-bem [bem]
  (str (build-bem bem) "__item"))

(def ^:private size-prop-set
  #{:large :normal :small})

(def ^:private widget-prop-set
  #{:button :icon})

(defn- build-class
  [{:keys [bem cid columns cns disabled equidistant group-custom-props inline invalid no-row-gap size soft-columns
           stacked-on-mobile widget]}]
  (->> [["columns" columns]
        ["disabled" disabled]
        ["equidistant" equidistant]
        ["inline" (or inline (pos? columns))]
        ["invalid" invalid]
        ["noRowGap" no-row-gap]
        ["size" (-> size keyword size-prop-set (or :normal))]
        ["softColumns" soft-columns]
        ["stackedOnMobile" stacked-on-mobile]
        ["widget" widget]]
       (concat (or group-custom-props []))
       (sort-by first)
       (concat [["cns" cns] ["cid" cid]])
       (bem-utils/build-class (build-bem bem))))

(defn- build-item-elt-props [props {:keys [group-item-custom-props]}]
  (let [{:keys [bem columns soft-columns]} props]
    (cond-> {:class (bem-utils/build-class (build-item-elt-bem bem) (sort-by first (or group-item-custom-props [])))}
      (and (integer? columns) (pos? columns))
      (update :style assoc (if soft-columns :min-width :width) (str (/ 100 columns) "%")))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group input.

  Not intended to be used directly but rather as a base for more specific group input widgets:
  * [checkable-group-input](/widgets/checkable-group-input)
  * [text-group-input](/widgets/text-group-input)

  Arguments:
  * `props` - required, map. Supported keys:
    - `:bem` - string, 'nw-groupInput' by default. Would be used as widget's BEM. Provided by concrete group input
      widget to augment styling.
    - `:cid` - any, no default. Component id.
    - `:columns` - integer, no default. Number of items per row.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether widget disabled or not. When all items must be disabled just
      set `:disabled` to logical true in `:item-props` of concrete group input widget.
    - `:equidistant` - logical true/false, no default. Whether items have same width.
    - `:errors` - seq of strings, no default. Would be displayed only when not empty and :invalid.
    - `:group-custom-props` - seq of BEM modifiers, no default. Used to add custom BEM modifiers to widget's element.
      Each BEM modifier is a seq of two elements - name and value.
    - `:inline` - logical true/false, no default. Whether items grouped stacked or inline.
    - `:invalid` - logical true/false, no default. Whether widget is in invalid state or not. When all items must be
      marked invalid just set `:invalid` to logical true in `:item-props` of concrete group input widget.
    - `:item-props` - map, no default. Common props for all items in group, but we don't guarantee that they wouldn't
      overridden, for example, on-change event handler would be overridden in most cases.
    - `:item-widget` - required, component. Used to render items, must accept props map (see `:items`) as argument.
    - `:items` - seq of maps, no default. Used to render group items, see concrete group input widget implementation for
      details. Optionally, it can have:
      * `:group-item-custom-props` - seq of BEM modifiers, no default. Used to add custom BEM modifiers to widget item's
        element. Each BEM modifier is a seq of two elements - name and value.
    - `:no-row-gap` - logical true/false, no default. Whether to have (false) space between rows or not (true).
    - `:on-change` - function, no default. Called when browser input's on-change fired, see concrete group input widget
      implementation for details.
    - `:size` - one of :large, :normal (default), :small or their string/symbol equivalents. Widget size.
    - `:soft-columns` - logical true/false, no default. When logical true and `:columns` is also set then 'min-width'
      style is used instead of 'width'.
    - `:stacked-on-mobile` - logical true/false, no default. Whether items forcibly stacked on mobile screens.
    - `:value` - any, no default. Used as values for items, for example, in checkbox group input it used to determine
      which items are checked.
    - `:widget` - any, no default. Specifies how widget looks. Default value must be determined by concrete group input.

  Notes:
  * `:soft-columns` prop can be convenient in case of small containers, e.g. with just 2-3 columns

  TODO:
  * make `:group-custom-props` a function and use it to remove `:columns` when `:widget` is :button"
  [{:keys [bem errors invalid item-widget items] :as props}]
  [:div {:class (build-class props)}
   (into
     [:div {:class (build-inner-elt-bem bem)}]
     (for [item items]
       [:div (build-item-elt-props props item)
        [item-widget (dissoc item :group-item-custom-props)]]))
   (when (and invalid (seq errors))
     (into
       [:ul {:class (build-errors-elt-bem bem)}]
       (for [error errors]
         [:li {:class (build-error-elt-bem bem)} error])))])
