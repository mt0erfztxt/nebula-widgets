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
      public: {
        options: {
          force: true
        },
        src: ["public/*"]
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: "node_modules/font-awesome/fonts",
        src: "**/*",
        dest: "public/assets/fonts"
      },
      images: {
        expand: true,
        cwd: "src/images",
        src: "**",
        dest: "public/assets/images"
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
          "mkdir -p resources/public/assets/css && ./node_modules/.bin/stylus --hoist-atrules -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl && ./node_modules/.bin/cleancss -o public/assets/css/kitchen-sink.css public/assets/css/kitchen-sink.css"
      }
    },
    sprite: {
      icons: {
        src: "src/icons/*.png",
        dest:
          "public/assets/images/icons-" +
          getCollectiveMd5("assets/images/icons/*.png") +
          ".png",
        destCss: "src/stylus/core/icons.styl",
        imgPath:
          "../images/icons-" +
          getCollectiveMd5("assets/images/icons/*.png") +
          ".png"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-sh");
  grunt.loadNpmTasks("grunt-spritesmith");

  // -- Kitchen Sink

  grunt.registerTask("kitchenSink:dev:assets:build", [
    "copy:fonts",
    "copy:images"
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
