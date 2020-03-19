(ns figwheel-handler
  (:require
    [clojure.string :as str]
    [ring.middleware.resource :as resource-middleware]))

(defn- wrap-default-index [next-handler]
  (fn [request]
    (next-handler
      (if (str/starts-with? (:uri request) "/assets/")
        request
        (assoc request :uri "/index.html")))))

(def handler
  (-> (fn [_]
        {:body "static asset not found"
         :status 404})
      (resource-middleware/wrap-resource "public")
      (wrap-default-index)))
