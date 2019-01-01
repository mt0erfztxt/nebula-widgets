(ns nebula-widgets.kitchen-sink.panels.button-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.button-widget.common :as common]
    [nebula-widgets.kitchen-sink.routes :as routes]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.button.core :as button]
    [re-frame.core :as rf]))

(def ^:private href (routes/resolve :widgets/button))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget {:cid "010", :title "normal button"}
   [:<>
    [button/widget {:cid "010", :kind "normal", :text "Normal"}]
    [button/widget {:cid "020", :disabled true, :text "Disabled"}]
    [button/widget {:cid "030", :href href, :text "Link"}]]
   "```clojure
     [button/widget {}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget {:cid "020", :title "flat button"}
   [:<>
    [button/widget {:cid "010", :kind "flat", :text "Normal"}]
    [button/widget {:cid "020", :disabled true, :kind "flat", :text "Disabled"}]
    [button/widget {:cid "030", :href href, :kind "flat", :text "Link"}]]
   "```clojure
     [button/widget {:kind \"flat\"}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [example/widget {:cid "030", :title "primary button"}
   [:<>
    [button/widget {:cid "010", :kind "primary", :text "Normal"}]
    [button/widget {:cid "020", :disabled true, :kind "primary", :text "Disabled"}]
    [button/widget {:cid "030", :href href, :kind "primary", :text "Link"}]]
   "```clojure
     [button/widget {:primary true}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 040
;;------------------------------------------------------------------------------

(defn- example040-cmp []
  [example/widget {:cid "040", :title "secondary button"}
   [:<>
    [button/widget {:cid "010", :kind "secondary", :text "Normal"}]
    [button/widget {:cid "020", :disabled true, :kind "secondary", :text "Disabled"}]
    [button/widget {:cid "030", :href href, :kind "secondary", :text "Link"}]]
   "```clojure
     [button/widget {:secondary true}]
     ```"])

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:disabled :href :kind]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [props @*props]
        (into
          [ie/widget
           [button/widget (assoc props :text "Button")]]
          (for [params
                [[:- "button props"]
                 :disabled
                 [:href
                  [{:label "nil", :value nil}
                   {:label "string", :value "http://example.tld"}]]
                 [:kind (ie-cgi-knob/gen-items "flat" "normal" "primary" "secondary")]]
                :let [[cid label-or-items] (if (sequential? params) params [params])
                      label? (= :- cid)]]
            [ie-cgi-knob/widget
             {:cid cid, :label (when label? label-or-items)}
             (cond->
               {:cid cid
                :on-change (get ie-setters cid)
                :value (get props cid)}
               (and (not label?) label-or-items) (assoc :items label-or-items))]))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget []
  [:div.buttonWidgetPanel
   [man-page/widget
    "# Button widget"
    (-> #'button/widget meta :doc)
    "## Examples"
    [example010-cmp]
    [example020-cmp]
    [example030-cmp]
    [example040-cmp]
    "## Interactive example"
    [interactive-example-cmp]]])
