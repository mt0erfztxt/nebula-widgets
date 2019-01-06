(ns nebula-widgets.kitchen-sink.panels.form-widget.views
  (:require
    [clojure.string :as str]
    [nebula-widgets.kitchen-sink.panels.form-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.utils :as utils]
    [nebula-widgets.widgets.checkable-group-input-form-field.core :as checkable-group-input-form-field]
    [nebula-widgets.widgets.form.core :as form]
    [nebula-widgets.widgets.text-input-form-field.core :as text-input-form-field]
    [re-frame.core :as rf]))

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private supported-likes
  ["Apples" "Bananas" "Oranges"])

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:disabled :first-name :invalid :likes]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(let [{first-name-setter :first-name likes-setter :likes} ie-setters]
  (defn- handle-first-name-on-change [event]
    (first-name-setter (utils/event->value event)))

  (defn- handle-likes-on-change [value event]
    (let [checked (utils/event->checked event)]
      (likes-setter #((if checked conj disj) % value)))))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [disabled first-name likes] :as props} @*props]
        (into
          [ie/widget
           [form/widget
            (-> props
                (select-keys [:disabled :invalid])
                (assoc
                  :actions
                  {:disabled disabled
                   :groups
                   [{:alignment "center"
                     :buttons
                     [{:kind "flat", :text "Save"}
                      {:kind "flat", :text "Cancel"}]}]}
                  :title "Profile"))
            [text-input-form-field/widget
             {:disabled disabled
              :label "First name"}
             {:on-change handle-first-name-on-change
              :value first-name}]
            [checkable-group-input-form-field/widget
             {:disabled disabled
              :label "Likes"}
             {:items (for [label supported-likes] {:label label, :value (-> label str/lower-case keyword)})
              :on-change handle-likes-on-change
              :value likes}]]]
          (for [params
                [[:- "form props"]
                 :disabled
                 :invalid]
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
  (let []
    [:div.formWidgetPanel
     [man-page/widget
      "# Form widget"
      (-> #'form/widget meta :doc)
      "## Interactive example"
      [interactive-example-cmp]]]))
