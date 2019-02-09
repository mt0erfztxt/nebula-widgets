(ns nebula-widgets.widgets.tabs.core
  (:require
    [reagent.core :as r]
    [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-tabs")

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

;; TODO: Update docs
(defn- button-cmp
  "Component that displays tabs button. Accepts `props` map:
  * `:active`
  * `:cid` - required, any. Must be unique across all buttons of `tabs` widget
    instance because it used to identify button.
  * `:disabled`
  * `:icon` - required, string. An icon from FontAwesome icon set but without
    'fa-' prefix, for example, 'fa-edit' would be 'edit'.
  * `:on-click` - required, function, no default. Would be called on button
    click with browser event object and info map as arguments.
  * `:placement` - optional, one of `:after`, `:before` or their string
    equivalents, `:before` by default. Allows to choose where to place button -
    before or after list of tab heads.
  * `:position` - optional, one of `:end`, `:start` or their string equivalents,
    `:start` by default. Allows to choose at which edge of `tabs` widget's head
    button must positioned.
  * `:rotated` - optional, any, no default. When evaluates to logical true then
    button would be 180deg rotated."
  [{:keys [active cid disabled icon on-click rotated] :as props} info]
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
     :on-click (r/partial on-click props info)
     :type "button"}
    [:i {:class (str "fa fa-fw fa-" icon)}]]])

;; TODO: Update docs
(defn- button-group-cmp
  "Renders list of buttons for specified group but only when group has buttons. Accepts map where keys are groups and
  values are buttons in group. Group must be one of :after, :before, :end or :start."
  [placement button-groups widget-info]
  [:div {:class (bem-utils/build-class button-group-elt-bem [["placement" placement]])}
   (for [{:keys [cid] :as button-props} (-> button-groups (get placement) :buttons)]
     ^{:key cid}
     [button-cmp button-props widget-info])])

(defn- tab-body
  "Renders tab's body. Accepts `props` map:
  * `:active` - logical false/true, no default. Whether tab is active or not.
  * `:content` - renderable. Content for tab's body. Use React fragment to put multiple renderables without wrapper.
  * `:cid` - required, any. Component id. Must be unique across all tabs of widget because it used to identify tab."
  [{:keys [active content cid]}]
  [:div {:class (bem-utils/build-class tab-body-elt-bem [["cid" cid] ["active" active]])}
   content])

(defn- tab-head
  "Renders tab's head. Accepts `props` map:
  * `:active` - logical false/true, no default. Whether tab is active or not.
  * `:cid` - required, any. Component id. Must be unique across all tabs of widget because it used to identify tab.
  * `:disabled` - logical false/true, no default. Whether tab is disabled or not.
  * `:href` - string, no default. When evaluates to logical true tab's head would be rendered using `<A>` tag with
    'href' attribute set to that value.
  * `:icon` - string, no default. An icon from FontAwesome icon set but without 'fa-' prefix, for example, 'fa-edit'
    would be 'edit'.
  * `:label` - string, no default. Text that would be placed inside tab's head.
  * `:on-click` - function, no default. Would be called on tab's head click with tab's head props and browser event.
    Called even when `:disabled` is logical true."
  [{:keys [active cid disabled href icon label on-click]}]
  (let [icon-hcp
        (when icon
          [:div {:class tab-head-icon-elt-bem}
           [:i {:class (str "fa fa-fw fa-" icon)}]])
        label-hcp (when label [:div {:class tab-head-text-elt-bem} label])]
    [(if href :a :div)
     {:class (bem-utils/build-class tab-head-elt-bem [["cid" cid] ["active" active] ["disabled" disabled]])
      :href href
      :on-click on-click}
     (cond-> [:div {:class tab-head-inner-elt-bem}]
       icon-hcp (conj icon-hcp)
       label-hcp (conj label-hcp))]))

(def ^:private layout-prop-set
  #{:horizontal :vertical})

(def ^:private sidebar-gutter-prop-set
  #{:normal :large})

(def ^:private sidebar-panel-prop-set
  #{:normal :large})

(def ^:private sidebar-placement-prop-set
  #{:left :right})

(def ^:private sidebar-default-prop
  {:gutter :none
   :panel :normal
   :placement :left})

(def ^:private size-prop-set
  #{:large :normal :small})

(defn- build-sidebar-prop [value]
  (when-let [{:keys [gutter panel placement]}
             (cond
               (true? value) sidebar-default-prop
               (map? value) (merge sidebar-default-prop value))]
    {:gutter (-> gutter keyword sidebar-gutter-prop-set (or :normal))
     :panel (-> panel keyword sidebar-panel-prop-set (or :normal))
     :placement (-> placement keyword sidebar-placement-prop-set (or :left))}))

(defn- build-class
  "Returns string - CSS class for widget's element. Accepts component props."
  [{:keys [adjusted cid cns collapsed layout sidebar size]}]
  (let [{sidebar-gutter :gutter sidebar-panel :panel sidebar-placement :placement} (build-sidebar-prop sidebar)
        sidebar? (boolean sidebar-gutter)]
    (bem-utils/build-class
      bem
      [["cns" cns]
       ["cid" cid]
       ["adjusted" adjusted]
       ["collapsed" collapsed]
       ["layout" (-> (if sidebar? "vertical" layout) keyword layout-prop-set (or :horizontal))]
       ["sidebar" sidebar?]
       ["sidebarGutter" sidebar-gutter]
       ["sidebarPanel" sidebar-panel]
       ["sidebarPlacement" sidebar-placement]
       ["size" (-> size keyword size-prop-set (or :normal))]])))

(def ^:private supported-tab-body-props
  "List of props for tab's body."
  [:active :content :cid])

(def ^:private supported-tab-head-props
  "List of props for tab's head."
  [:active :cid :disabled :icon :label :href :on-click])

(defn- build-tab-parts-hcps
  "Accepts widget's `props`, walks through `:items.data` prop of widget and returns map that contains vector of
  `tab-body` components placed under `:body` key and vector of `tab-head` components placed under `:head` key."
  [{:keys [active-tab on-tab-click] :as props}]
  (reduce
    (fn [{:keys [body head]} {:keys [cid on-click] :as item}]
      (let [tab (assoc item :active (= cid active-tab))]
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
                    (when on-tab-click (on-tab-click tab event))
                    (when on-click (on-click tab event)))))
              supported-tab-head-props)])}))
    {:body nil, :head nil}
    (-> props :items :data reverse)))

(def ^:private button-group-prop-set
  #{:after :before :end :start})

(def ^:private placement-prop-set
  #{:after :before})

(def ^:private position-prop-set
  #{:end :start})

(defn- button-group-empty? [button-groups placement]
  (-> button-groups placement :buttons empty?))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Update docs and:
;;       - buttons in button-group must have cid because it used as React `key`
;;       - use `size` prop instead of `sidebar.gutter` as they do the same
(defn widget
  "Component that displays tabs. Accepts `props` map:
  * `:active-tab` - optional, any, no default. Item of `:items` prop with same
    `:cid` prop would be marked active.
  * `:adjusted` - optional, any, no default. When evaluates to logical true
    then widget adjusts to size of parent element. Adjusting is made by using
    absolute positioning of widget's element, so parent must have proper CSS
    positioning ('absolute', 'relative', etc).
  * `:buttons` - optional, map:
    - `:after` - optional, seq of maps, no default. Allows to add buttons after
      list of item heads. See `tabs-button` component for details.
    - `:before` - optional, seq of maps, no default. Allows to add buttons
      before list of item heads. See `tabs-button` component for details.
  * `:cid` - optional, no default. Anything that can be used as component id.
  * `:cns` - optional, no default. Anything that can be used as component ns.
  * `:items` - optional, map:
    - `:data` - optional, seq of maps, no default. Each map used as data for
      single tab.
    - `:position` - optional, one of `:end`, `:start` or their string
      equivalents, `:start` by default. Allows to choose at which edge of `tabs`
      widget's head list of tab heads must positioned.
  * `:layout` - optional, one of `:horizontal`, `:vertical` or their string
    equivalents, `:horizontal` by default. Whether list of item heads and bodies
    must be displayed one-below-other or side-by-side.
  * `:on-tab-click` - optional, function, no default. Would be called before tab
    head's click handler with browser event object and tab map as arguments.
  * `:size` - optional, one of `:large`, `:normal`, `:small` or their string
    equivalents, `:normal` by default. Allows to set size of tab's head.
  * `:title` - optional, map, no default. Title for widget:
    - `:placement` - optional, one of `:after`, `:before` or their string
      equivalents, `:before` by default. Allows to display title after or before
      list of item heads.
    - `:text` - optional, string, no default. Widget's title.

  TODO:
  * maybe flexbox can be used instead of float/position to place buttons and tab heads
  * cleanup styles"
  [{:keys [button-groups] :as props}]
  (let [tab-parts-hcps (build-tab-parts-hcps props)
        widget-info (select-keys props [:active-tab :collapsed])]
    [:div {:class (build-class props)}
     [:div {:class head-elt-bem}
      (when-let [title (:title props)]
        [:div
         {:class
          (bem-utils/build-class
            title-elt-bem
            [["placement" (-> title :placement keyword placement-prop-set (or :before))]])}
         title])
      [button-group-cmp :start button-groups widget-info]
      [:div
       {:class
        (bem-utils/build-class
          list-container-elt-bem
          [["position" (-> props :items :position keyword position-prop-set (or :start))]])}
       [button-group-cmp :before button-groups widget-info]
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
       [button-group-cmp :after button-groups widget-info]]
      [button-group-cmp :end button-groups widget-info]]
     [:div {:class body-elt-bem} (:body tab-parts-hcps)]]))
