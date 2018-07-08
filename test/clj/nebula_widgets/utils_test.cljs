(ns nebula-widgets.utils-test
  (:require
    [cljs.test :refer-macros [deftest is testing]]
    [nebula-widgets.utils :as utils]))

(deftest calculate-prop-value-test
  (let [sut #'utils/calculate-prop-value]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should return found keyword"
      (is (= :bar (sut :bar #{:foo :bar :foobar}))))
    (testing "030 It should return nil when not found"
      (is (nil? (sut :non-existent #{:foo :bar :foobar}))))
    (testing "040 It should allow value to be a string"
      (is (= :bar (sut "bar" #{:foo :bar :foobar}))))
    (testing "050 It should allow value to be a symbol"
      (is (= :bar (sut 'bar #{:foo :bar :foobar}))))
    (testing "060 It should allow supported values to be a collection"
      (is (= :bar (sut :bar #{:foo :bar :foobar})))
      (is (= :bar (sut :bar [:foo :bar :foobar])))
      (is (= :bar (sut :bar '(:foo :bar :foobar)))))
    (testing "070 It should allow to provide default value"
      (is (= "default-value" (sut :non-existent #{:foo :bar :foobar} "default-value"))))))
