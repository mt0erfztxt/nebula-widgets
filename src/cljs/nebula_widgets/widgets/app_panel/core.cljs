(ns nebula-widgets.widgets.app-panel.core
  (:require
    [clojure.string :as str]
    [goog.dom :as gdom]
    [goog.style :as gstyle]
    [nebula-widgets.widgets.app-panel.head :as app-panel-head]
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

(def ^:private head-elt-bem
  (str bem "__head"))

(def ^:private header-elt-bem
  (str bem "__header"))

(def ^:private header-inner-elt-bem
  (str header-elt-bem "-inner"))

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
         (fn [{:keys [placement separated] :as props}]
           (let [placement (-> placement keyword toolbar-placement-prop-set (or :top))
                 props (assoc props
                         :placement placement
                         ;; TODO: Remove separated prop because of now toolbars always separated
                         :separated (-> separated boolean #{false true}))]
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
                [:div {:class (str sidebar-elt-bem "-inner")} content]]
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

(defn- update-main-elt-padding [this]
  (let [layout (-> this r/props :layout name)
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

;; TODO: Update docs
(defn widget
  "Renders app panel. Accepts optional props map and any number of child components.
  Supported props:
  * :bars - seq of maps. Each item in deq is a props for app-panel-bar widget with :placement prop set to :top
    by default, and :separated set to false by default.
  * :header - any, no default. Props for app header (container for head and top bar). No header when false or map:
    - :pinned - boolean, no default. Whether header is pinned (sticky header) or not.
  * :head - renderable, no default. App panel's head.
  * :sidebars - seq of maps, where map is:
    - :content - renderable, no default. Sidebar content.
    - :collapsed - logical true/false, no default. Whether sidebar is collapse or not.
    - :gutter - enum, one of false (default), :large, :normal, :small or their string/symbol equivalents. Sidebar's
      gutter size.
    - :placement - enum, one of :left (default), :right or their string/symbol equivalents. Sidebar placement.
    - :size - enum, one of :large, :normal (default), :small or their string/symbol equivalents. Sidebar size.

  FIXME:
  * sidebar without gutter disappears while collapsing"
  [& _args]
  (r/create-class
    {:reagent-render
     (fn [& _args]
       (let [[{:keys [footer header sidebars toolbars] :as props} children] ((juxt r/props r/children) (r/current-component))
             {{left-sidebar :hcp} :left, {right-sidebar :hcp} :right, :as sidebar-mapping} (build-sidebar-mapping sidebars)
             {bottom-toolbars :bottom, top-toolbars :top} (build-toolbar-mapping toolbars)
             bottom-toolbars? (boolean (seq bottom-toolbars))
             top-toolbars? (boolean (seq top-toolbars))]
         [:div {:class (build-class props sidebar-mapping)}
          (cond-> [:div {:class main-elt-bem}]
                  ;;
                  (or header top-toolbars?)
                  (conj
                    (cond-> [:div {:class (build-sidebar-container-class "top")}]
                            ;;
                            header
                            (conj [:div {:class head-elt-bem} header])
                            ;;
                            top-toolbars?
                            (conj (into [:div {:class toolbars-elt-bem}] (map :hcp top-toolbars)))))
                  ;;
                  :always
                  (conj (into [:div {:class body-elt-bem}] children))
                  ;;
                  (or footer bottom-toolbars?)
                  (conj
                    (cond-> [:div {:class (build-sidebar-container-class "bottom")}]
                            ;;
                            footer
                            (conj [:div {:class footer-elt-bem} footer])
                            ;;
                            bottom-toolbars?
                            (conj (into [:div {:class toolbars-elt-bem}] (map :hcp bottom-toolbars))))))
          left-sidebar
          right-sidebar]))
     :component-did-mount
     (fn [this]
       (update-main-elt-padding this))
     :component-did-update
     (fn [this _]
       (update-main-elt-padding this))}))
