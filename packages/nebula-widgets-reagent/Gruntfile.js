const fs = require("fs");
const md5 = require("md5");

module.exports = function(grunt) {
  function getCollectiveMd5(files) {
    const expandedFiles = grunt.file.expand(files);
    const collectiveContent = expandedFiles.reduce(function(content, file) {
      return content + fs.readFileSync(file, "binary");
    }, "");
    return md5(collectiveContent);
  }

  grunt.initConfig({
    clean: {
      webpackOut: {
        options: {
          force: true
        },
        src: ["webpack-out"]
      }
    },
    copy: {
      kitchenSinkHtml: {
        src: "src/html/kitchen-sink/index.html",
        dest: "resources/public/index.html"
      }
    },
    sh: {
      kitchenSinkDevCljsBuild: {
        cmd: "lein cljsbuild once kitchen-sink"
      },
      kitchenSinkDevCljsBuildClean: {
        cmd: "lein do clean, cljsbuild once kitchen-sink"
      },
      kitchenSinkDevCljsWatch: {
        cmd: "lein figwheel kitchen-sink"
      },
      kitchenSinkDevCljsWatchClean: {
        cmd: "lein do clean, figwheel kitchen-sink"
      },
      kitchenSinkDevJsBuild: {
        cmd:
          "./node_modules/.bin/webpack --config config/webpack.kitchen-sink.dev.js"
      },
      kitchenSinkProdCljsBuild: {
        cmd: "lein with-profile prod do clean, cljsbuild once kitchen-sink"
      },
      kitchenSinkProdJsBuild: {
        cmd:
          "./node_modules/.bin/webpack --config config/webpack.kitchen-sink.prod.js"
      },
      kitchenSinkProdStaticServe: {
        cmd: "./node_modules/.bin/serve --listen 3449 --single"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-sh");

  // -- Kitchen Sink

  grunt.registerTask("kitchenSink:dev:cljs:build", [
    "copy:kitchenSinkHtml",
    "kitchenSink:dev:js:build",
    "sh:kitchenSinkDevCljsBuild"
  ]);

  grunt.registerTask("kitchenSink:dev:cljs:buildClean", [
    "copy:kitchenSinkHtml",
    "kitchenSink:dev:js:build",
    "sh:kitchenSinkDevCljsBuildClean"
  ]);

  grunt.registerTask("kitchenSink:dev:cljs:watch", [
    "copy:kitchenSinkHtml",
    "kitchenSink:dev:js:build",
    "sh:kitchenSinkDevCljsWatch"
  ]);

  grunt.registerTask("kitchenSink:dev:cljs:watchClean", [
    "copy:kitchenSinkHtml",
    "kitchenSink:dev:js:build",
    "sh:kitchenSinkDevCljsWatchClean"
  ]);

  grunt.registerTask("kitchenSink:dev:js:build", ["sh:kitchenSinkDevJsBuild"]);
  grunt.registerTask("kitchenSink:prod:build", [
    "clean",
    "copy:kitchenSinkHtml",
    "sh:kitchenSinkProdJsBuild",
    "sh:kitchenSinkProdCljsBuild"
  ]);

  grunt.registerTask("kitchenSink:prod:build+run", [
    "kitchenSink:prod:build",
    "sh:kitchenSinkProdStaticServe"
  ]);

  grunt.registerTask("kitchenSink:prod:run", ["sh:kitchenSinkProdStaticServe"]);
};
