(ns nebula-widgets.widgets.app-panel-test
  (:require
    [cljs.test :refer-macros [deftest is testing]]
    [nebula-widgets.widgets.app-panel :as app-panel]))

(deftest build-sidebar-modifiers-test
  (let [sut #'app-panel/build-sidebar-modifiers]
    (testing "010 It's a function"
      (is (fn? sut)))
    (testing "020 It returns seq of sidebar modifiers"
      (is (nil? (sut nil)))
      (is (nil? (sut {})))
      (is (= ["rightSidebar" ["rightSidebar-collapsed" nil]] (sut {:placement :right})))
      (is (= ["leftSidebar" ["leftSidebar-collapsed" false]] (sut {:collapsed? false :placement :left}))))))
