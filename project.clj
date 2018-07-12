(defproject nebula-widgets "0.1.0-SNAPSHOT"
  :description "Nebula widgets"
  :url "http://example.com/FIXME"
  :license {:name "Apache License, Version 2.0"
            :url  "https://www.apache.org/licenses/LICENSE-2.0"}
  :dependencies [[devcards "0.2.5"]
                 [funcool/cuerdas "2.0.5"]
                 [org.clojure/clojure "1.9.0"]
                 [org.clojure/clojurescript "1.10.339" :scope "provided"]
                 [org.slf4j/slf4j-nop "1.7.25" :scope "test"]]
  :min-lein-version "2.0.0"
  :target-path "target/%s/"
  :clean-targets ^{:protect false} [:target-path
                                    [:cljsbuild :builds :dev :compiler :output-dir]
                                    [:cljsbuild :builds :dev :compiler :output-to]
                                    [:cljsbuild :builds :devcards :compiler :output-dir]
                                    [:cljsbuild :builds :devcards :compiler :output-to]
                                    [:cljsbuild :builds :test :compiler :output-dir]
                                    [:cljsbuild :builds :test :compiler :output-to]]
  :source-paths ["src/clj"]
  :resource-paths ["resources" "target/cljsbuild"]
  :test-paths ["test/clj"]
  :plugins [[lein-ancient "0.6.15"]
            [lein-cljsbuild "1.1.7"]]
  :aliases {"test-all"      ["do" "clean," "doo" "phantom" "test" "once"]
            "test-all-auto" ["do" "clean," "doo" "phantom" "test" "auto"]}
  :profiles
  {:dev           [:project/dev :profiles/dev]
   :test          [:project/dev :project/test :profiles/test]
   :project/dev   {:cljsbuild    {:builds
                                  {:dev
                                   {:compiler     {:asset-path           "/assets/js/kitchen-sink"
                                                   :main                 nebula-widgets.kitchen-sink.core
                                                   :optimizations        :none
                                                   :output-dir           "target/cljsbuild/public/assets/js/kitchen-sink"
                                                   :output-to            "target/cljsbuild/public/assets/js/kitchen-sink.js"
                                                   :preloads             [devtools.preload]
                                                   :pretty-print         true
                                                   :source-map           true
                                                   :source-map-timestamp true}
                                    :figwheel     {:on-jsload "nebula-widgets.kitchen-sink.views/mount-root-view"}
                                    :source-paths ["src/clj" "src/cljs"]}
                                   :devcards
                                   {:compiler     {:asset-path           "/assets/js/devcards"
                                                   :main                 nebula-widgets.devcards.core
                                                   :optimizations        :none
                                                   :output-dir           "target/cljsbuild/public/assets/js/devcards"
                                                   :output-to            "target/cljsbuild/public/assets/js/devcards.js"
                                                   :preloads             [devtools.preload]
                                                   :pretty-print         true
                                                   :source-map           true
                                                   :source-map-timestamp true}
                                    :figwheel     {:devcards true}
                                    :source-paths ["src/clj" "src/cljs" "devcards_src"]}
                                   :test
                                   {:compiler     {:main                 nebula-widgets.runner
                                                   :optimizations        :none
                                                   :output-dir           "target/cljsbuild/dev-test/test"
                                                   :output-to            "target/cljsbuild/dev-test/test.js"
                                                   :pretty-print         true
                                                   :source-map           true
                                                   :source-map-timestamp true}
                                    :source-paths ["src/clj" "src/cljs" "test/clj"]}}}
                   :dependencies [[binaryage/devtools "0.9.10"]
                                  [cider/cider-nrepl "0.17.0"]
                                  [com.cemerick/piggieback "0.2.2"]
                                  [doo "0.1.10"]
                                  [funcool/bide "1.6.0"]
                                  [re-frame "0.10.5"]
                                  [ring/ring-core "1.6.3"]]
                   :doo          {:build "test"}
                   :figwheel     {:css-dirs          ["resources/public/assets/css"]
                                  :http-server-root  "public"
                                  :nrepl-port        7002
                                  :open-file-command "figwheel-emacsclient"
                                  :ring-handler      figwheel-handler/handler}
                   :plugins      [[lein-doo "0.1.10"]
                                  [lein-figwheel "0.5.16"]]}
   :project/test  {}
   :profiles/dev  {}
   :profiles/test {}})
