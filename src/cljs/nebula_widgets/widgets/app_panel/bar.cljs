(ns nebula-widgets.widgets.app-panel.bar
  (:require [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem
  "nw-appPanel-bar")

(def ^:private inner-elt-bem
  (str bem "__inner"))

(defn- build-class [{:keys [placement separated]}]
  (bem-utils/build-class bem [["placement" placement] ["separated" separated]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "Renders bar of app panel. Accepts props map:
  * :content - renderable, no default. Bar content.
  * :placement - enum, no default, one of :bottom, :top or their string/symbol equivalents. Bar placement.
  * :separated - logical true/false, no default. Whether bar has separator or not."
  [{:keys [content] :as props}]
  [:div
   {:class (build-class props)}
   [:div {:class (str inner-elt-bem)} content]])
