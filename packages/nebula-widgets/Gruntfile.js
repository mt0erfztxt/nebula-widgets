const fs = require("fs");
const md5 = require("md5");
const sass = require("dart-sass");

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
      public: {
        options: {
          force: true
        },
        src: ["public/*"]
      }
    },
    copy: {
      mainFonts: {
        expand: true,
        cwd: "node_modules/font-awesome/fonts",
        src: "**/*",
        dest: "public/assets/fonts"
      },
      mainImages: {
        expand: true,
        cwd: "src/main/images",
        src: "**",
        dest: "public/assets/images"
      }
    },
    sass: {
      kitchenSink: {
        files: {
          "public/assets/css/kitchen-sink.css":
            "src/kitchen-sink/sass/index.sass"
        }
      },
      main: {
        files: {
          "public/assets/css/main.css": "src/main/sass/index.sass"
        }
      },
      options: {
        implementation: sass,
        sourceMap: true
      }
    },
    sh: {
      kitchenSinkDevCssBuild: {
        cmd:
          "mkdir -p public/assets/css && ./node_modules/.bin/stylus -m -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl"
      },
      kitchenSinkDevCssWatch: {
        cmd:
          "mkdir -p public/assets/css && ./node_modules/.bin/stylus -w -m -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl"
      },
      kitchenSinkProdCssBuild: {
        cmd:
          "mkdir -p public/assets/css && ./node_modules/.bin/stylus --hoist-atrules -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl && ./node_modules/.bin/cleancss -o public/assets/css/kitchen-sink.css public/assets/css/kitchen-sink.css"
      }
    },
    sprite: {
      icons: {
        src: "src/main/icons/*.png",
        dest:
          "public/assets/images/sprites-" +
          getCollectiveMd5("assets/images/icons/*.png") +
          ".png",
        destCss: "src/main/sass/_sprites.sass",
        imgPath:
          "../images/icons-" +
          getCollectiveMd5("assets/images/icons/*.png") +
          ".png"
      }
    },
    watch: {
      files: ["src/kitchen-sink/sass/**/*.sass", "src/main/sass/**/*.sass"],
      tasks: ["sass:kitchenSink"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-sh");
  grunt.loadNpmTasks("grunt-spritesmith");

  // -- Kitchen Sink

  grunt.registerTask("kitchenSink:dev:watch", [
    "kitchenSink:dev:assets:build",
    "sass:kitchenSink",
    "watch"
  ]);

  grunt.registerTask("kitchenSink:dev:assets:build", [
    "copy:mainFonts",
    "copy:mainImages"
  ]);

  grunt.registerTask("kitchenSink:dev:css:build", [
    "kitchenSink:dev:assets:build",
    "sprite",
    "sh:kitchenSinkDevCssBuild"
  ]);

  grunt.registerTask("kitchenSink:dev:css:watch", [
    "kitchenSink:dev:assets:build",
    "sprite",
    "sh:kitchenSinkDevCssWatch"
  ]);

  grunt.registerTask("kitchenSink:prod:build", [
    "clean",
    "copy:fonts",
    "copy:images",
    "sprite",
    "sh:kitchenSinkProdCssBuild"
  ]);
};
