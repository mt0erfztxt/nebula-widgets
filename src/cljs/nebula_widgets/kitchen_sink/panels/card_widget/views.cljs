(ns nebula-widgets.kitchen-sink.panels.card-widget.views
  (:require
    [nebula-widgets.widgets.card.core :as card]
    [re-frame.core :as rf]))

(defn- bar-content-cmp [text]
  [:div.cardWidgetPanel-cardBar text])

(defn- body-child-cmp [text]
  [:div.cardWidgetPanel-cardBodyChild text])

(defn- body-cmp []
  [:div.cardWidgetPanel-cardBody
   (for [n (range 1 109)]
     ^{:key n} [body-child-cmp (str "Body child " n)])])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; TODO: Remove events and subs if don't plan to add knobs.
(defn widget []
  (let [*bottom-bar (rf/subscribe [:card-widget-panel/bottom-bar])
        *top-bar (rf/subscribe [:card-widget-panel/top-bar])]
    (fn []
      (let [{bottom-bar-separated? :separated?} @*bottom-bar
            {top-bar-separated? :separated?} @*top-bar]
        [:div.cardWidgetPanel
         [:div.cardWidgetPanel-adjustableExample
          [card/widget
           {:adjustable? true
            :bars        [{:content [bar-content-cmp "Top bar"] :placement "top" :separated? top-bar-separated?}
                          {:content [bar-content-cmp "Bottom bar"] :separated? bottom-bar-separated?}]
            :flat?       true}
           [body-cmp]]]
         [:div.cardWidgetPanel-nonAdjustableExample
          [card/widget
           {:bars [{:content [bar-content-cmp "Top bar"] :placement "top" :separated? top-bar-separated?}
                   {:content [bar-content-cmp "Bottom bar"] :placement "bottom" :separated? bottom-bar-separated?}]}
           [body-cmp]]]]))))
