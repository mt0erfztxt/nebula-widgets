(ns nebula-widgets.test.utils-test
  (:require
    [cljs.test :refer [deftest is testing]]
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

(deftest update-hcp-props-test
  (let [sut #'utils/update-hcp-props
        initial-props {:foo "bar"}
        updated-props {:foo 42}
        updater #(assoc % :foo 42)]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should correctly update passed args when it has no 'props' nor 'children'"
      (is (= [{}] (sut [] identity)))
      (is (= [updated-props] (sut [] updater))))
    (testing "030 It should correctly update passed args when it has only 'props'"
      (is (= [initial-props] (sut [initial-props] identity)))
      (is (= [updated-props] (sut [] updater))))
    (testing "040 It should correctly update passed args when it has only 'children'"
      (is (= [{} "foo" "bar" "baz"] (sut ["foo" "bar" "baz"] identity)))
      (is (= [updated-props "foo" "bar" "baz"] (sut ["foo" "bar" "baz"] updater))))
    (testing "050 It should correctly update passed args when it has both 'props' and 'children'"
      (is (= [{} "foo" "bar" "baz"] (sut [{} "foo" "bar" "baz"] identity)))
      (is (= [updated-props "foo" "bar" "baz"] (sut [initial-props "foo" "bar" "baz"] updater))))
    (testing "060 It should allow args to be not only vector but any suitable seq"
      (is (= [{}] (sut '() identity)))
      (is (= [updated-props] (sut (map identity []) updater))))
    (testing "070 It should allow args to be something not sequential"
      (is (= [{} "foo"] (sut "foo" identity)))
      (is (= [updated-props 42] (sut 42 updater))))))

(deftest remove-padding-test
  (let [sut #'utils/remove-padding]
    (testing "010 It should exist and be a function"
      (is (fn? sut)))
    (testing "020 It should remove padding from string"
      (is (= "foo\n\nbar\n   42"
             (sut
               "foo

                bar
                   42"))))))
