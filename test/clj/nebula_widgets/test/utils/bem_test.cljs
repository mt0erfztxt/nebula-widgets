(ns nebula-widgets.test.utils.bem-test
  (:require
    [cljs.test :refer [deftest is testing]]
    [nebula-widgets.utils.bem :as bem-utils]))

(deftest to-modifier-name-test
  (let [sut #'bem-utils/to-modifier-name]
    (testing "010 It's a function"
      (is (fn? sut)))
    (testing "020 It returns string as-is when string passed in"
      (is (= "foo" (sut "foo"))))
    (testing "030 It returns name of keyword when keyword passed in"
      (is (= "foo" (sut :foo))))
    (testing "030 It returns name of symbol when symbol passed in"
      (is (= "foo" (sut 'foo))))
    (testing "040 It throws otherwise"
      (is (thrown-with-msg? js/TypeError
                            #"BEM modifier name must be a string, a keyword or a symbol"
                            (sut 42))))))

(deftest modifier->string-test
  (let [sut #'bem-utils/modifier->string]
    (testing "010 It's a function"
      (is (fn? sut)))
    (testing "020 It returns nil when modifier name is nil"
      (is (nil? (sut nil))))
    (testing "030 It returns nil when modifier value is nil"
      (is (nil? (sut "foo" nil))))
    (testing "040 It returns nil when modifier value is false"
      (is (nil? (sut "bar" false))))
    (testing "035 It returns simple modifier string (just modifier name) when modifier value is true"
      (is (= "my-mod" (sut "my-mod" true))))
    (testing "060 It returns composite modifier (modifier name and value separated with underscore) otherwise"
      (is (= "foo_bar" (sut "foo" "bar")))
      (is (= "foo_42" (sut "foo" 42))))
    (testing "070 It sets optional modifier value to true by default"
      (is (= "foobar" (sut "foobar" true))))))

(deftest build-class-test
  (let [sut #'bem-utils/build-class]
    (testing "010 It's a function"
      (is (fn? sut)))
    (testing "020 It returns correct value"
      (is (= "foo" (sut "foo" nil)))
      (is (= "foo" (sut "foo" [])))
      (is (= "foo" (sut "foo" [["bar" nil]])))
      (is (= "foo" (sut "foo" [["bar" false]])))
      (is (= "foo foo--bar" (sut "foo" ["bar"])))
      (is (= "foo foo--bar" (sut :foo ["bar"])))
      (is (= "foo foo--bar" (sut 'foo ["bar"])))
      (is (= "foo foo--bar" (sut "foo" [["bar" true]])))
      (is (= "foo foo--bar_baz" (sut "foo" [["bar" "baz"]])))
      (is (= "foo foo--bar_baz foo--fiz_buzz foo--id_42" (sut "foo" [["bar" "baz"] [:fiz 'buzz] '("id" 42)]))))))
