(ns figwheel-handler
  (:require
    [clojure.string :as str]
    [ring.middleware.resource :as resource-middleware]))

(defn- wrap-default-index [next-handler]
  (fn [request]
    (next-handler
      (if (str/starts-with? (:uri request) "/assets/")
        request
        (assoc request :uri "/kitchen-sink.html")))))

(def handler
  (-> (fn [_] {:status 404 :body "static asset not found"})
      (resource-middleware/wrap-resource "public")
      (wrap-default-index)))
