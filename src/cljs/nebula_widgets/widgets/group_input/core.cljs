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
  #{:button :icon :native})

(defn- build-class
  [{:keys [bem cid columns cns disabled equidistant inline invalid no-row-gap size soft-columns stacked-on-mobile
           widget]}]
  (bem-utils/build-class
    (build-bem bem)
    [["cns" cns]
     ["cid" cid]
     ["columns" columns]
     ["disabled" disabled]
     ["equidistant" equidistant]
     ["inline" (or inline (pos? columns))]
     ["invalid" invalid]
     ["noRowGap" no-row-gap]
     ["size" (-> size keyword size-prop-set (or :normal))]
     ["softColumns" soft-columns]
     ["stackedOnMobile" stacked-on-mobile]
     ["widget" widget]]))

(defn- build-item-props [props checked]
  (let [{:keys [bem columns soft-columns]} props]
    (cond-> {:class (bem-utils/build-class (build-item-elt-bem bem) [["checked" checked]])}
            (and (integer? columns) (pos? columns))
            (update :style assoc (if soft-columns :min-width :width) (str (/ 100 columns) "%")))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group input.

  Not intended to be used directly but rather as a base for more specific checkable group input widgets.

  Arguments:
  * `props` - optional, map, no default. Supported keys:
    - `:bem` - string, 'nw-groupInput' by default. Would be used as widget's BEM. Provided by concrete group input
      widget to augment styling.
    - `:cid` - any, no default. Component id.
    - `:columns` - integer, no default. Number of items per row.
    - `:cns` - any, no default. Component namespace.
    - `:disabled` - logical true/false, no default. Whether widget disabled or not.
    - `:equidistant` - logical true/false, no default. Whether items have same width.
    - `:errors` - seq of strings, no default. Would be displayed only when not empty and :invalid.
    - `:inline` - logical true/false, no default. Whether items grouped stacked or inline.
    - `:invalid` - logical true/false, no default. Whether widget is in invalid state or not.
    - `:item-props` - map, no default. Common props for all items in group, for example, event handlers.
    - `:items` - seq of maps, no default. Used to render group items, see concrete group input widget implementation for
      details.
    - `:no-row-gap` - logical true/false, no default. Whether to have (false) space between rows or not (true).
    - `:on-change` - function, no default. Called when browser input's on-change fired, see concrete group input widget
      implementation for details.
    - `:size` - one of :large, :normal (default), :small or their string/symbol equivalents. Widget size.
    - `:soft-columns` - logical true/false, no default. When logical true and `:columns` is also set then 'min-width'
      style is used instead of 'width'.
    - `:stacked-on-mobile` - logical true/false, no default. Whether items forcibly stacked on mobile screens.
    - `:value` - any, no default. Used as values for items, for example, in checkbox group input it used to determine
      which items are checked.
    - `:widget` - one of :button, :icon (default), :native or their string/symbol equivalents. Specifies how widget
      looks.

  Notes:
  * `:invalid` prop of group overrides same prop of item
  * `:soft-columns` prop can be convenient in case of small containers, e.g. with just 2-3 columns

  TODO:
  * add tests for `:no-row-gap` prop"
  [{:keys [bem errors invalid item-widget items widget] :as props}]
  (let [widget (-> widget keyword widget-prop-set (or :icon))]
    [:div {:class (build-class (assoc props :widget widget))}
     (into
       [:div {:class (build-inner-elt-bem bem)}]
       (for [{:keys [checked] :as item} items]
         [:div (build-item-props props checked)
          [item-widget (assoc item :widget widget)]]))
     (when (and invalid (seq errors))
       (into
         [:ul {:class (build-errors-elt-bem bem)}]
         (for [error errors]
           [:li {:class (build-error-elt-bem bem)} error])))]))
