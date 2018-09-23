(ns nebula-widgets.test.kitchen-sink.widgets.markdown.core-test
  (:require
    [clojure.string :as str]
    [cljs.test :refer [deftest is testing]]
    [nebula-widgets.kitchen-sink.widgets.markdown.core :as markdown] ))

(deftest cleanup-code-tests
  (let [sut #'markdown/cleanup-code]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It cleanups passed in string"
      (is (= "```clojure(defn foo [] \"bar\")```"
             (str/replace
               (sut "```clojure
                    (defn foo []
                     \"bar\")
                    ```")
               #"\n"
               ""))))))
