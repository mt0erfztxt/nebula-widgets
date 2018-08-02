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

(deftest path-str->segments-test
  (let [sut #'utils/path-str->segments]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should return correct result"
      (is (empty? (sut nil)))
      (is (empty? (sut "")))
      (is (= '("foo" "bar") (sut "foo.bar")))
      (is (= '("foo" "bar") (sut "foo.bar.")))
      (is (= '("foo" "bar") (sut " foo.bar.  ")))
      (is (= '("foo" "bar") (sut " .foo.bar.  "))))))

(deftest segments->path-str-test
  (let [sut #'utils/segments->path-str]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should return correct result"
      (is (nil? (sut nil)))
      (is (nil? (sut "")))
      (is (= "foo" (sut ["foo"])))
      (is (= "foo.bar" (sut ["foo" "bar"]))))))

(deftest path->keyword-test
  (let [sut #'utils/path->keyword]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should return correct result"
      (is (= :foo (sut "foo")))
      (is (= :foo (sut :foo)))
      (is (= :foo.bar (sut "foo" "bar")))
      (is (= :foo.bar (sut :foo "bar")))
      (is (= :foo.bar (sut :foo :bar)))
      (is (= :fiz/foo.bar (sut "fiz" "/" "foo" "bar")))
      (is (= :fiz.buz/foo.bar (sut "fiz" :buz "/" 'foo "bar")))
      (is (= :fiz.buz/foo.bar (sut "fiz" :buz "/" "/" 'foo :/ "bar" "/"))))))

(deftest keyword->path-test
  (let [sut #'utils/keyword->path]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should return correct result"
      (is (= [:ns-segment-a :ns-segment-b :foo :bar] (sut :ns-segment-a.ns-segment-b/foo.bar)))
      (is (= [:foo :bar] (sut :foo.bar))))
    (testing "030 It should exclude event name from result"
      (is (= [:ns-segment-a :ns-segment-b :bar]
             (sut :ns-segment-a.ns-segment-b/foo.bar {:event-name? true}))))
    (testing "040 It should return that consists from string segments when keywordize? option is not true"
      (is (= ["ns-segment-a" "ns-segment-b" "foo" "bar"]
             (sut :ns-segment-a.ns-segment-b/foo.bar {:keywordize? false}))))))
