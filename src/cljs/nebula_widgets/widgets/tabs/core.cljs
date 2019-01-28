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

(def ^:private buttons-elt-bem
  (str bem "__buttons"))

(def ^:private head-elt-bem
  (str bem "__head"))

(def ^:private list-elt-bem
  (str bem "__list"))

(def ^:private list-container-elt-bem
  (str bem "__listContainer"))

(def ^:private tab-body-elt-bem
  (str bem "__tab-body"))

(def ^:private tab-head-elt-bem
  (str bem "__tab-head"))

(def ^:private tab-head-icon-elt-bem
  (str tab-head-elt-bem "-icon"))

(def ^:private tab-head-inner-elt-bem
  (str bem "__tab-head-inner"))

(def ^:private tab-head-spacer-elt-bem
  (str bem "__tab-head-spacer"))

(def ^:private tab-head-text-elt-bem
  (str tab-head-elt-bem "-text"))

(def ^:private title-elt-bem
  (str bem "__title"))

;; TODO: Update docs
(defn- button-cmp
  "Component that displays tabs button. Accepts `props` map:
  * `:cid` - required, any. Must be unique across all buttons of `tabs` widget
    instance because it used to identify button.
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
  [{:keys [cid icon on-click rotated] :as props} info]
  [:span
   {:class (bem-utils/build-class button-elt-bem [["cid" cid] ["rotated" rotated]])
    :on-click (r/partial on-click props info)
    :type "button"}
   [:i {:class (str "fa fa-fw fa-" icon)}]])

(def ^:private buttons-group-set
  #{:after :before :end :start})

(defn- buttons-cmp
  "Renders list of buttons for specified group but only when group has buttons. Accepts map where keys are groups and
  values are buttons in group. Group must be one of :after, :before, :end or :start."
  [button-hcp-by-group-mapping group]
  (when-let [button-hcps (get button-hcp-by-group-mapping group)]
    (into
      [:div {:class (bem-utils/build-class buttons-elt-bem [["group" group]])}]
      button-hcps)))

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
     [:div {:class tab-head-spacer-elt-bem}]
     (cond-> [:div {:class tab-head-inner-elt-bem}]
       icon-hcp (conj icon-hcp)
       label-hcp (conj label-hcp))]))

(def ^:private layout-prop-set
  #{:horizontal :vertical})

(def ^:private sidebar-prop-set
  #{:normal})

(def ^:private size-prop-set
  #{:large :normal :small})

(defn- build-class
  "Returns string - CSS class for widget's element. Accepts component props."
  [{:keys [adjusted cid cns collapsed layout sidebar size]}]
  (bem-utils/build-class
    bem
    [["cns" cns]
     ["cid" cid]
     ["adjusted" adjusted]
     ["collapsed" collapsed]
     ["layout" (-> layout keyword layout-prop-set (or :horizontal))]
     ["sidebar" (-> sidebar keyword size-prop-set (or :normal))]
     ["size" (-> size keyword size-prop-set (or :normal))]]))

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

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Update docs.
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
  [props]
  (let [button-hcp-by-group-mapping
        (reduce
          (fn [acc item]
            (update
              acc
              (-> item :group keyword button-group-prop-set (or :after))
              #(conj (or % []) [button-cmp item (select-keys props [:active-tab :collapsed])])))
          {}
          (:buttons props))
        tab-parts-hcps (build-tab-parts-hcps props)]
    [:div {:class (build-class props)}
     [:div {:class head-elt-bem}
      (when-let [title (:title props)]
        [:div
         {:class
          (bem-utils/build-class
            title-elt-bem
            [["placement" (-> title :placement keyword placement-prop-set (or :before))]])}
         title])
      [buttons-cmp button-hcp-by-group-mapping :start]
      [:div
       {:class
        (bem-utils/build-class
          list-container-elt-bem
          [["position" (-> props :items :position keyword position-prop-set (or :start))]])}
       [buttons-cmp button-hcp-by-group-mapping :before]
       [:div {:class list-elt-bem} (:head tab-parts-hcps)]
       [buttons-cmp button-hcp-by-group-mapping :after]]
      [buttons-cmp button-hcp-by-group-mapping :end]]
     [:div {:class body-elt-bem} (:body tab-parts-hcps)]]))
