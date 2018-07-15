(ns nebula-widgets.widgets.app-panel.bar
  (:require [nebula-widgets.utils.bem :as bem-utils]))

(def ^:private bem "nw-appPanel-bar")
(def ^:private bem-inner (str bem "__inner"))

(defn- build-class [{:keys [placement separated?]}]
  (bem-utils/build-class bem [["placement" placement] ["separated" separated?]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; PUBLIC
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn widget
  "props:
  :content    - renderable, no default
  :placement  - enum, no default, one of :bottom, :top or their string/symbol equivalents
  :separated? - boolean, no default, whether bar has separator or not"
  [{:keys [content] :as props}]
  [:div
   {:class (build-class props)}
   [:div {:class (str bem-inner)} content]])
