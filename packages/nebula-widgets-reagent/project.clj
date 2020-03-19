(defproject nebula-widgets-reagent "0.1.0-SNAPSHOT"
  :description "Nebula widgets"
  :url "https://github.com/mt0erfztxt/nebula-widgets"
  :license
  {:name "Apache License, Version 2.0"
   :url "https://www.apache.org/licenses/LICENSE-2.0"}
  :dependencies
  [[binaryage/oops "0.6.2"]
   [com.taoensso/timbre "4.10.0"]
   [funcool/bide "1.6.0"]
   [org.clojure/clojure "1.9.0"]
   [org.clojure/clojurescript "1.10.339" :scope "provided"]
   [org.slf4j/slf4j-nop "1.7.25" :scope "test"]
   [re-frame "0.10.5" :exclusions [reagent]]
   [reagent "0.8.1"]]
  :min-lein-version "2.0.0"
  :target-path "target/%s/"
  :clean-targets
  ^{:protect false}
  [:target-path
   [:cljsbuild :builds :kitchen-sink :compiler :output-dir]
   [:cljsbuild :builds :kitchen-sink :compiler :output-to]
   [:cljsbuild :builds :test :compiler :output-dir]
   [:cljsbuild :builds :test :compiler :output-to]]
  :source-paths ["src/clj"]
  :resource-paths ["resources" "target/cljsbuild"]
  :test-paths ["test/clj"]
  :plugins
  [[lein-ancient "0.6.15"]
   [lein-cljsbuild "1.1.7"]
   [lein-pprint "1.2.0"]]
  :doo {:build "test"}
  :aliases
  {"test-all" ["do" "clean," "doo" "chrome-headless" "test" "once"]
   "test-all-auto" ["do" "clean," "doo" "chrome-headless" "test" "auto"]}
  :profiles
  {:dev [:project/dev :profiles/dev]
   :prod [:project/prod :profiles/prod]
   :test [:project/dev :project/test :profiles/test]
   :gh-pages
   {:cljsbuild
    {:builds
     {:kitchen-sink
      {:compiler
       {:closure-defines {nebula-widgets.kitchen-sink.config.gh-pages true}
        :foreign-libs
        [{:file "webpack-out/kitchen-sink/js-bundle.prod.js"
          :provides ["js-bundle"]}]
        :main nebula-widgets.kitchen-sink.core
        :npm-deps false
        :optimizations :advanced
        :output-to "resources/public/assets/js/kitchen-sink.js"}
       :source-paths ["src/cljs"]}}}}
   :project/dev
   {:cljsbuild
    {:builds
     {:kitchen-sink
      {:compiler
       {:asset-path "/assets/js/kitchen-sink"
        :closure-defines {"re_frame.trace.trace_enabled_QMARK_" true}
        :foreign-libs
        [{:file "webpack-out/kitchen-sink/js-bundle.dev.js"
          :provides ["js-bundle"]}]
        :main nebula-widgets.kitchen-sink.core
        :npm-deps false
        :optimizations :none
        :output-dir "target/cljsbuild/public/assets/js/kitchen-sink"
        :output-to "target/cljsbuild/public/assets/js/kitchen-sink.js"
        :preloads [day8.re-frame-10x.preload devtools.preload]
        :pretty-print true
        :source-map-timestamp true}
       :figwheel {:on-jsload "nebula-widgets.kitchen-sink.views/mount-root-view"}
       :source-paths ["src/clj" "src/cljs"]}
      :test
      {:compiler
       {:foreign-libs
        [{:file "webpack-out/kitchen-sink/js-bundle.dev.js"
          :provides ["js-bundle"]}]
        :main nebula-widgets.runner
        :optimizations :none
        :output-dir "target/cljsbuild/dev-test/test"
        :output-to "target/cljsbuild/dev-test/test.js"
        :pretty-print true
        :source-map true
        :source-map-timestamp true}
       :source-paths ["src/clj" "src/cljs" "test/clj"]}}}
    :dependencies
    [[binaryage/devtools "0.9.10"]
     [cider/cider-nrepl "0.17.0"]
     [com.cemerick/piggieback "0.2.2"]
     [day8.re-frame/re-frame-10x "0.3.3-react16"]
     [doo "0.1.10"]
     [ring/ring-core "1.6.3"]]
    :figwheel
    {:css-dirs ["resources/public/assets/css"]
     :http-server-root "public"
     :nrepl-port 7002
     :open-file-command "figwheel-emacsclient"
     :ring-handler figwheel-handler/handler}
    :plugins
    [[lein-doo "0.1.10"]
     [lein-figwheel "0.5.16"]]}
   :profiles/dev {}
   :project/prod
   {:cljsbuild
    {:builds
     {:kitchen-sink
      {:compiler
       {:foreign-libs
        [{:file "webpack-out/kitchen-sink/js-bundle.prod.js"
          :provides ["js-bundle"]}]
        :main nebula-widgets.kitchen-sink.core
        :npm-deps false
        :optimizations :advanced
        :output-to "resources/public/assets/js/kitchen-sink.js"}
       :source-paths ["src/cljs"]}}}}
   :profiles/prod {}
   :project/test {}
   :profiles/test {}})
