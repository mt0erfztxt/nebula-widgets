(ns nebula-widgets.kitchen-sink.panels.button-group-set-widget.views
  (:require
    [nebula-widgets.kitchen-sink.panels.button-group-set-widget.common :as common]
    [nebula-widgets.kitchen-sink.widgets.man-page.core :as man-page]
    [nebula-widgets.kitchen-sink.widgets.man-page.example.core :as example]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.core :as ie]
    [nebula-widgets.kitchen-sink.widgets.man-page.interactive-example.knob.checkable-group-input :as ie-cgi-knob]
    [nebula-widgets.widgets.button-group-set.core :as button-group-set]
    [re-frame.core :as rf]))

(defn- build-alignment-data
  "Accept integer and returns seq.

  Examples:
  - (build-data 2) => `[[:left [1 2]] [:center [3 4]] [:right [5 6]]]`
  - (build-data 3) => `[[:left [1 2 3]] [:center [4 5 6]] [:right [7 8 9]]]`."
  [n]
  (loop [m 1, [alignment :as alignments] [:left :center :right], result []]
    (if (empty? alignments)
      result
      (let [p (+ n m)]
        (recur p (rest alignments) (conj result [alignment (range m p)]))))))

(defn- build-groups
  ([n] (build-groups n false))
  ([n disabled]
   (for [[alignment xs] (build-alignment-data n)]
     {:alignment alignment
      :buttons (for [n xs] {:text (str "Button" n)})
      :disabled disabled})))

;;------------------------------------------------------------------------------
;; Example 010
;;------------------------------------------------------------------------------

(defn- example010-cmp []
  [example/widget {:cid "010", :title "default button group set"}
   [button-group-set/widget {:groups (build-groups 2)}]
   "```clj
     [button-group-set/widget
      {:groups
       [{:alignment \"left\", :buttons [{...} {...}]}
        {:alignment \"center\", :buttons [{...} {...}]}
        {:alignment \"right\", :buttons [{...} {...}]}]
     ```"])

;;------------------------------------------------------------------------------
;; Example 020
;;------------------------------------------------------------------------------

(defn- example020-cmp []
  [example/widget {:cid "020", :title "disabled button group set"}
   [button-group-set/widget {:disabled true, :groups (build-groups 2)}]
   "```clj
     [button-group-set/widget
      {:disabled true
       :groups [{:disabled false, :buttons [{:disabled false, :text \"Button\"} ...]}]
     ```"])

;;------------------------------------------------------------------------------
;; Interactive example
;;------------------------------------------------------------------------------

(def ^:private interactive-example-path->keyword
  (partial common/panel-path->keyword :interactive-example "/"))

(def ^:private ie-setters
  (->> [:disabled :group-disabled]
       (map
         (fn [prop]
           [prop #(rf/dispatch [(interactive-example-path->keyword :set prop) %])]))
       (into {})))

(defn- interactive-example-cmp []
  (let [*props (rf/subscribe [(interactive-example-path->keyword)])]
    (fn []
      (let [{:keys [group-disabled] :as props} @*props]
        (into
          [ie/widget
           [button-group-set/widget
            (-> props
                (select-keys [:disabled])
                (assoc :groups (build-groups 2 (when (not= "nil" group-disabled) group-disabled))))]]
          (for [params
                [[:- "button group set props"]
                 :disabled
                 [:- "button group props"]
                 [:group-disabled (ie-cgi-knob/gen-items "nil" ["false" false] ["true" true])]]
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
    [:div.buttonGroupSetWidgetPanel
     [man-page/widget
      "# Button group set widget"
      (-> #'button-group-set/widget meta :doc)
      "## Examples"
      [example010-cmp]
      [example020-cmp]
      "## Interactive example"
      [interactive-example-cmp]]]))
