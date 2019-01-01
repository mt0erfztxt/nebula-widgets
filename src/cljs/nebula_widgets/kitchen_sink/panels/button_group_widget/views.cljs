(ns nebula-widgets.kitchen-sink.panels.button-group-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.button-group-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.button-group.core :as button-group]
    [re-frame.core :as rf]))

(def ^:private button-set
  (repeat 3 {:text "Button"}))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget {:cid "010", :title "default button group with three buttons"}
   [button-group/widget {:buttons button-set, :cid "010"}]
   "```clojure
     [button-group/widget {:buttons (repeat 3 {:text \"Button\"})}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  (let [button-set (take 2 button-set)]
    [example/widget {:cid "020", :title "button group alignment"}
     [:div {:style {:position "relative", :text-align "center"}}
      (map-indexed
        #(with-meta
           [button-group/widget {:alignment %2, :buttons button-set, :cid (->> %1 inc (* 10) (str "0"))}]
           {:key %1})
        [:left :center :right])]
     "```clojure
       [button-group/widget
        {:alignment \"left\"   ; center, right
         :buttons [...]}]
       ```"]))

;;------------------------------------------------------------------------------
;; Example 030
;;------------------------------------------------------------------------------

(defn- example030-cmp []
  [example/widget {:cid "030", :title "disabled button group"}
   [button-group/widget
    {:buttons
     [{:text "Button1"}
      {:text "Button2", :disabled false}
      {:text "Button3"}]
     :cid "010"
     :disabled true}]
   "```clojure
     [button-group/widget
      {:buttons [...]
       :disabled true}]
     ```"])

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:alignment :disabled]
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
           [:div {:style {:height 32, :position "relative", :text-align "center"}}
            [button-group/widget (assoc props :buttons (for [n (range 3)] {:text (str "Button" n)}))]]]
          (for [params
                [[:- "button group props"]
                 [:alignment (ie-cgi-knob/gen-items "center" "left" "right")]
                 :disabled]
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
    [:div.buttonGroupWidgetPanel
     [man-page/widget
      "# Button group widget"
      (-> #'button-group/widget meta :doc)
      "## Examples"
      [example010-cmp]
      [example020-cmp]
      [example030-cmp]
      "## Interactive example"
      [interactive-example-cmp]]]))
