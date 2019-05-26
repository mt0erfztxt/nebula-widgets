(ns nebula-widgets.kitchen-sink.routes
  (:refer-clojure :exclude [resolve])
  (:require
    [bide.core :as bide]
    [nebula-widgets.kitchen-sink.config :as config]))

(defn- create-router [gh-pages?]
  (let [prefix (str "/" (when gh-pages? "nebula-widgets/"))]
    (bide/router
      [[prefix :home]
       [(str prefix "widgets/action-group") :widgets/action-group]
       [(str prefix "widgets/action-group-action") :widgets/action-group-action]
       [(str prefix "widgets/app-panel") :widgets/app-panel]
       [(str prefix "widgets/button") :widgets/button]
       [(str prefix "widgets/button-group") :widgets/button-group]
       [(str prefix "widgets/button-group-set") :widgets/button-group-set]
       [(str prefix "widgets/card") :widgets/card]
       [(str prefix "widgets/checkable-group-input-form-field") :widgets/checkable-group-input-form-field]
       [(str prefix "widgets/checkable-group-input") :widgets/checkable-group-input]
       [(str prefix "widgets/checkable-input") :widgets/checkable-input]
       [(str prefix "widgets/form") :widgets/form]
       [(str prefix "widgets/form-field") :widgets/form-field]
       [(str prefix "widgets/group-input") :widgets/group-input]
       [(str prefix "widgets/tab-group") :widgets/tab-group]
       [(str prefix "widgets/text-group-input-form-field") :widgets/text-group-input-form-field]
       [(str prefix "widgets/text-group-input") :widgets/text-group-input]
       [(str prefix "widgets/text-input") :widgets/text-input]
       [(str prefix "widgets/toolbar") :widgets/toolbar]])))

(def router (create-router config/gh-pages))

(defn match [url]
  (bide/match router url))

(defn navigate! [& args]
  (apply bide/navigate! router args))

(defn resolve [& args]
  (apply bide/resolve router args))
