(ns nebula-widgets.test.scratch
  (:require
    [cljs.test :refer [deftest is testing]]))

(deftest foo-tests
  (let [sut true?]
    (testing "010 It passes"
      (is (fn? sut)))))
