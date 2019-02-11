(ns nebula-widgets.widgets.tab-group.core
  (:require
    [reagent.core :as r]
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-tabGroup")

(def ^:private body-elt-bem
  (str bem "__body"))

(def ^:private button-elt-bem
  (str bem "__button"))

(def ^:private button-inner-elt-bem
  (str bem "__button-inner"))

(def ^:private button-group-elt-bem
  (str bem "__buttonGroup"))

(def ^:private head-elt-bem
  (str bem "__head"))

(def ^:private list-container-elt-bem
  (str bem "__listContainer"))

(def ^:private list-elt-bem
  (str bem "__list"))

(def ^:private tab-body-elt-bem
  (str bem "__tab-body"))

(def ^:private tab-head-elt-bem
  (str bem "__tab-head"))

(def ^:private tab-head-icon-elt-bem
  (str tab-head-elt-bem "-icon"))

(def ^:private tab-head-inner-elt-bem
  (str bem "__tab-head-inner"))

(def ^:private tab-head-text-elt-bem
  (str tab-head-elt-bem "-text"))

(def ^:private title-elt-bem
  (str bem "__title"))

(defn- button-cmp
  "See docs for `:button-groups` prop of widget for details"
  [{:keys [active cid disabled icon on-click rotated]}]
  [:div
   {:class
    (bem-utils/build-class
      button-elt-bem
      [["cid" cid]
       ["active" active]
       ["disabled" disabled]
       ["rotated" rotated]])}
   [:button
    {:class button-inner-elt-bem
     :disabled disabled
     :on-click on-click
     :type "button"}
    [:i {:class (str "fa fa-fw fa-" icon)}]]])

(defn- button-group-cmp
  "Renders group of buttons. Accepts group placement, `button-groups` prop passed to widget and a map with info to be
  passed on each button's click handler."
  [placement button-groups]
  [:div {:class (bem-utils/build-class button-group-elt-bem [["placement" placement]])}
   (for [{:keys [cid] :as button-props} (-> button-groups (get placement) :buttons)]
     ^{:key cid}
     [button-cmp button-props])])

(defn- tab-body [{:keys [active content cid]}]
  [:div
   {:class
    (bem-utils/build-class
      tab-body-elt-bem
      [["cid" cid]
       ["active" active]])}
   content])

(defn- tab-head [{:keys [active cid disabled href icon label on-click]}]
  (let [icon-hcp
        (when icon
          [:div {:class tab-head-icon-elt-bem}
           [:i {:class (str "fa fa-fw fa-" icon)}]])
        label-hcp (when label [:div {:class tab-head-text-elt-bem} label])]
    [(if href :a :div)
     {:class
      (bem-utils/build-class
        tab-head-elt-bem
        [["cid" cid]
         ["active" active]
         ["disabled" disabled]])
      :href href
      :on-click on-click}
     (cond-> [:div {:class tab-head-inner-elt-bem}]
       icon-hcp (conj icon-hcp)
       label-hcp (conj label-hcp))]))

(def ^:private alignment-prop-set
  #{:end :start})

(def ^:private layout-prop-set
  #{:horizontal :vertical})

(def ^:private sidebar-panel-prop-set
  #{:normal :large})

(def ^:private sidebar-placement-prop-set
  #{:left :right})

(def ^:private sidebar-default-prop
  {:panel :normal
   :placement :left})

(def ^:private size-prop-set
  #{:large :normal :small})

(defn- build-sidebar-prop [value]
  (when-let [{:keys [panel placement]}
             (cond
               (true? value) sidebar-default-prop
               (map? value) (merge sidebar-default-prop value))]
    {:panel (-> panel keyword sidebar-panel-prop-set (or :normal))
     :placement (-> placement keyword sidebar-placement-prop-set (or :left))}))

(defn- build-class
  "Returns string - CSS class for widget's element. Accepts component props."
  [{:keys [alignment cid cns collapsed layout sidebar size]}]
  (let [{sidebar-panel :panel sidebar-placement :placement} (build-sidebar-prop sidebar)
        sidebar? (boolean sidebar-placement)]
    (bem-utils/build-class
      bem
      [["cns" cns]
       ["cid" cid]
       ["alignment" (-> alignment keyword alignment-prop-set (or :start))]
       ["collapsed" collapsed]
       ["layout" (-> (if sidebar? "vertical" layout) keyword layout-prop-set (or :horizontal))]
       ["sidebar" sidebar?]
       ["sidebarPanel" sidebar-panel]
       ["sidebarPlacement" sidebar-placement]
       ["size" (-> size keyword size-prop-set (or :normal))]])))

(def ^:private supported-tab-body-props
  "List of props for tab's body."
  [:active :cid :content])

(def ^:private supported-tab-head-props
  "List of props for tab's head."
  [:active :cid :disabled :href :icon :label :on-click])

(defn- build-tab-parts-hcps
  "Accepts widget's `props`, walks through `:tabs` prop and returns map that contains vector of `tab-body` components
  placed under `:body` key and vector of `tab-head` components placed under `:head` key."
  [{:keys [active-tab on-tab-click] :as props}]
  (reduce
    (fn [{:keys [body head]} {:keys [cid on-click] :as tab}]
      (let [tab (assoc tab :active (= cid active-tab))]
        {:body (conj body ^{:key cid} [tab-body (select-keys tab supported-tab-body-props)])
         :head
         (conj
           head
           ^{:key cid}
           [tab-head
            (select-keys
              (assoc tab
                :on-click
                (r/partial
                  (fn [event]
                    (when on-tab-click (on-tab-click cid event))
                    (when on-click (on-click event)))))
              supported-tab-head-props)])}))
    {:body nil, :head nil}
    (-> props :tabs reverse)))

(def ^:private title-placement-prop-set
  #{:after :before})

(defn- button-group-empty? [button-groups placement]
  (-> button-groups placement :buttons empty?))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders group of tabs.

  Arguments:
  * `props` - required, map. Supported props:
    - `:active-tab` - any, no default. Item of `:tabs` prop with same `:cid` would be marked active.
    - `:alignment` - one of :end, :start (default) or their string/symbol equivalents. Allows to choose to which edge
      list of tabs' heads must be aligned.
    - `:button-groups` - map, no default. Used to render buttons grouped in four predefined groups. Keys must be on of
      :after, :before, :end or :start and values are seq of maps, where each map is:
      * `:active` - logical true/false, no default. Whether button is active or not.
      * `:cid` - required, any. Must be unique across all buttons in group because it used as React key.
      * `:disabled` - logical true/false, no default. Whether button is disabled or not.
      * `:icon` - required, string. An icon from FontAwesome icon set but without 'fa-' prefix, for example, 'fa-edit'
        would be 'edit'.
      * `:on-click` - required, function, no default. Would be called on button click with browser event as argument.
      * `:rotated` - logical true/false, no default. Whether button is button rotated by 180deg or not.
    - `:cid` - any, no default. Component id.
    - `:cns` - any, no default. Component namespace.
    - `:collapsed` - logical true/false, no default. Whether tab's bodies list collapsed or not.
    - `:tabs` - seq of maps, no default. Each map is a data for single tab:
      * `:cid` - required, any. Component id. Must be unique across all tabs because it used to identify active tab.
      * `:content` - single renderable, no default. Content for tab's body.
      * `:disabled` - logical false/true, no default. Whether tab is disabled or not.
      * `:href` - string, no default. If used, tab's head would be rendered using <A> tag with 'href' attribute.
      * `:icon` - string, no default. An icon from FontAwesome 4 icon set but without 'fa-' prefix.
      * `:label` - string, no default. If used, tab's head would have that text in it.
      * `:on-click` - function, no default. If used, would be called (even when `:disabled` is logical true) on tab's
        head click with browser event.
    - `:layout` - one of :horizontal (default), :vertical or their string/symbol equivalents. Whether list of tab heads
      and bodies displayed one-below-other or side-by-side.
    - `:on-tab-click` - function, no default. If used, it would be called before tab's :on-click with clicked tab :cid
      and browser event as arguments.
    - `:sidebar` - map, no default. Allows to configure widget to be used as application panel's sidebar:
      * `:panel` - one of :large, :normal (default) or their string/symbol equivalents. Determines panel size (width).
      * `:placement` - one of :left (default), :right or their string/symbol equivalents. Determines in which sidebar of
        application panel widget to be used.
    - `:size` - one of :large, :normal (default) or their string/symbol equivalents. Allows to set size of tab's head.
    - `:title` - map, no default. Title for widget:
      * `:placement` - one of :after, :before (default) or their string/symbol equivalents. Allows to display title
        after or before list of tab's heads.
      * `:text` - string, no default. Widget's title.

  TODO:
  * cleanup styles"
  [{:keys [button-groups] :as props}]
  (let [tab-parts-hcps (build-tab-parts-hcps props)]
    [:div {:class (build-class props)}
     [:div {:class head-elt-bem}
      (when-let [title (:title props)]
        [:div
         {:class
          (bem-utils/build-class
            title-elt-bem
            [["placement" (-> title :placement keyword title-placement-prop-set (or :before))]])}
         title])
      [button-group-cmp :start button-groups]
      [:div {:class list-container-elt-bem}
       [button-group-cmp :before button-groups]
       [:div
        {:class
         (bem-utils/build-class
           list-elt-bem
           [["firstChild"
             (and (button-group-empty? button-groups :before)
                  (button-group-empty? button-groups :start))]
            ["lastChild"
             (and (button-group-empty? button-groups :after)
                  (button-group-empty? button-groups :end))]])}
        (:head tab-parts-hcps)]
       [button-group-cmp :after button-groups]]
      [button-group-cmp :end button-groups]]
     [:div {:class body-elt-bem} (:body tab-parts-hcps)]]))
