(ns nebula-widgets.widgets.app-panel.core
  (:require
    [clojure.string :as str]
    [goog.dom :as gdom]
    [goog.style :as gstyle]
    [nebula-widgets.widgets.app-panel.toolbar :as app-panel-toolbar]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.utils.bem :as bem-utils]
    [oops.core :as oops]
    [reagent.core :as r]))

(def ^:private bem
  "nw-appPanel")

(def ^:private body-elt-bem
  (str bem "__body"))

(def ^:private crossbar-elt-bem
  (str bem "__crossbar"))

(def ^:private footer-elt-bem
  (str bem "__footer"))

(def ^:private header-elt-bem
  (str bem "__header"))

(def ^:private main-elt-bem
  (str bem "__main"))

(def ^:private sidebar-elt-bem
  (str bem "__sidebar"))

(def ^:private toolbars-elt-bem
  (str bem "__toolbars"))

(defn- build-sidebar-modifiers [{:keys [collapsed gutter placement size] :as sidebar-props}]
  (when (and (map? sidebar-props) (seq sidebar-props))
    (let [prefix (-> placement name (str "Sidebar"))]
      [prefix
       [(str prefix "-collapsed") collapsed]
       [(str prefix "-gutter") gutter]
       [(str prefix "-size") size]])))

(defn- build-class [{:keys [cid cns header layout]} sidebar-mapping]
  (bem-utils/build-class
    bem
    (apply
      concat
      [["cns" cns]
       ["cid" cid]
       ["header" (boolean header)]
       ["layout" layout]]
      (->> sidebar-mapping (map #(-> % second :props)) (map build-sidebar-modifiers)))))

(def ^:private toolbar-placement-prop-set
  #{:bottom :top})

(defn- build-toolbar-mapping [toolbars]
  (->> toolbars
       (map
         (fn [props]
           (let [props (assoc props :placement (-> props :placement keyword toolbar-placement-prop-set (or :top)))]
             {:hcp [app-panel-toolbar/widget props]
              :props props})))
       (reduce
         (fn [acc item]
           (update acc (-> item :props :placement) #(conj (or % []) item)))
         {})))

(def ^:private sidebar-gutter-prop-set
  #{:none :large :normal :small})

(def ^:private sidebar-placement-prop-set
  #{:left :right})

(defn- build-sidebar-mapping [sidebars]
  (->> sidebars
       (map
         (fn [{:keys [content collapsed gutter placement size] :as sidebar-props}]
           (let [placement (-> placement keyword sidebar-placement-prop-set (or :left))]
             [placement
              {:hcp
               [:div {:class (bem-utils/build-class sidebar-elt-bem [["collapsed" collapsed] ["placement" placement]])}
                [:div {:class (str sidebar-elt-bem "-backdrop")}]
                content]
               :props
               (assoc sidebar-props
                 :gutter (-> gutter keyword sidebar-gutter-prop-set (or :none))
                 :placement placement
                 :size (utils/calculate-size-like-prop-value size))}])))
       (into {})))

(defn- build-sidebar-container-class [placement]
  (bem-utils/build-class crossbar-elt-bem [["placement" placement]]))

(defn- get-crossbar-height [parent-node placement]
  (some-> crossbar-elt-bem
          (str "--placement_" placement)
          (gdom/getElementByClass parent-node)
          (gstyle/getSize)
          (oops/oget "height")
          (str "px")))

(defn- get-layout-prop-value
  [props]
  (or (:layout props) :static))

(defn- update-main-elt-padding
  [this]
  (let [layout (-> this r/props get-layout-prop-value name)
        main-node (gdom/getElementByClass main-elt-bem (r/dom-node this))]
    (doseq [[placement aka] [["bottom" "footer"] ["top" "header"]]]
      (oops/oset!+
        main-node
        (str "style.padding" (str/capitalize placement))
        (or
          (and
            (#{"pinned" (str "pinned-" aka)} layout)
            (get-crossbar-height main-node placement))
          0)))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders application panel.

  Arguments:
  * `props` - optional, map. Supported props:
    - `:footer` - renderable, no default. Used to display user-defined header.
    - `:header` - renderable, no default. Used to display user-defined header.
    - `:layout` - enum, one of `:adjusted`, `:pinned`, `:pinned-footer`, `:pinned-header`, `:static` (default) or their
      string/symbol equivalents. Layout of application panel.
    - `:sidebars` - seq of maps, where each map can have following keys:
      * `:content` - renderable, no default. Content to place into sidebar.
      * `:collapsed` - logical true/false, no default. Whether sidebar is collapse or not.
      * `:gutter` - enum, one of :none (default), :large, :normal, :small or their string/symbol equivalents. Sidebar's
        gutter size.
      * `:placement` - enum, one of :left (default), :right or their string/symbol equivalents. Sidebar placement.
      * `:size` - enum, one of :large, :normal (default), :small or their string/symbol equivalents. Sidebar size.
    - `:toolbars` - seq of maps, where each map can have following keys:
      * `:content` - map or renderable, no default. When a map it's same as a `props` of action-bar widget, otherwise it
        would be rendered as-is.
      * `:placement` - required, one of :bottom, :top (default) or their string/symbol equivalents. Toolbar placement.
  * `& children` - renderables, any number of child components

  NOTE:
  * containers must have `height: 100%` for adjusted layout to work properly

  FIXME:
  * when sidebar created transition doesn't applied to it, but we have transition for crossbar and all it looks like
  content of crossbar flows from under created sidebar

  TODO:
  * perhaps `&__sidebar-inner` element need to be returned because of clicks on sidebar's content must not be caught by
  backdrop
  * duplicate BEM related to sidebar onto sidebar's element
  * allow sidebar to be resizable"
  [& _args]
  (r/create-class
    {:reagent-render
     (fn [& _args]
       (let [this (r/current-component)
             {:keys [footer header sidebars toolbars] :as props} (r/props this)
             sidebar-mapping (build-sidebar-mapping sidebars)
             {bottom-toolbars :bottom, top-toolbars :top} (build-toolbar-mapping toolbars)
             bottom-toolbars? (boolean (seq bottom-toolbars))
             top-toolbars? (boolean (seq top-toolbars))]
         [:div {:class (build-class props sidebar-mapping)}
          (cond-> [:div {:class main-elt-bem}]
            (or header top-toolbars?)
            (conj
              (cond-> [:div {:class (build-sidebar-container-class "top")}]
                header (conj [:div {:class header-elt-bem} header])
                top-toolbars? (conj (into [:div {:class toolbars-elt-bem}] (map :hcp top-toolbars)))))
            ;;
            :always
            (conj (into [:div {:class body-elt-bem}] (r/children this)))
            ;;
            (or footer bottom-toolbars?)
            (conj
              (cond-> [:div {:class (build-sidebar-container-class "bottom")}]
                bottom-toolbars? (conj (into [:div {:class toolbars-elt-bem}] (map :hcp bottom-toolbars)))
                footer (conj [:div {:class footer-elt-bem} footer]))))
          (-> sidebar-mapping :left :hcp)
          (-> sidebar-mapping :right :hcp)]))
     :component-did-mount
     (fn [this]
       (update-main-elt-padding this))
     :component-did-update
     (fn [this _]
       (update-main-elt-padding this))}))
