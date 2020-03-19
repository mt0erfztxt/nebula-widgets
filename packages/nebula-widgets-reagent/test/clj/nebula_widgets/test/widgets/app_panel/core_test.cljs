(ns nebula-widgets.test.widgets.app-panel.core-test
  (:require
    [cljs.test :refer [deftest is testing]]
    [nebula-widgets.widgets.app-panel.core :as app-panel]))

(deftest build-sidebar-modifiers-tests
  (let [sut #'app-panel/build-sidebar-modifiers]
    (testing "010 It's a function"
      (is (fn? sut)))
    (testing "020 It returns seq of sidebar modifiers"
      (is (nil? (sut nil)))
      (is (nil? (sut {})))
      (is (= ["rightSidebar"
              ["rightSidebar-collapsed" nil]
              ["rightSidebar-gutter" nil]
              ["rightSidebar-size" nil]]
             (sut {:placement :right})))
      (is (= ["leftSidebar"
              ["leftSidebar-collapsed" false]
              ["leftSidebar-gutter" "normal"]
              ["leftSidebar-size" :large]]
             (sut {:collapsed false
                   :gutter "normal"
                   :placement :left
                   :size :large}))))))
