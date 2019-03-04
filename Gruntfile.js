var fs = require('fs');
var md5 = require('md5');

module.exports = function(grunt) {
  function getCollectiveMd5(files) {
    var expandedFiles = grunt.file.expand(files);
    var collectiveContent = expandedFiles.reduce(function(content, file) {
      return content + fs.readFileSync(file, 'binary');
    }, '');
    return md5(collectiveContent);
  }

  grunt.initConfig({
    clean: {
      public: {
        options: {
          force: true
        },
        src: ['resources/public/*']
      },
      webpackOut: {
        options: {
          force: true
        },
        src: ['webpack-out']
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts',
        src: '**/*',
        dest: 'resources/public/assets/fonts'
      },
      images: {
        expand: true,
        cwd: 'assets/images',
        src: '**',
        dest: 'resources/public/assets/images'
      },
      kitchenSinkHtml: {
        src: 'src/html/kitchen-sink.html',
        dest: 'resources/public/index.html'
      }
    },
    sh: {
      kitchenSinkDevCljsBuild: {
        cmd: 'lein cljsbuild once kitchen-sink'
      },
      kitchenSinkDevCljsBuildClean: {
        cmd: 'lein do clean, cljsbuild once kitchen-sink'
      },
      kitchenSinkDevCljsWatch: {
        cmd: 'lein figwheel kitchen-sink'
      },
      kitchenSinkDevCljsWatchClean: {
        cmd: 'lein do clean, figwheel kitchen-sink'
      },
      kitchenSinkDevCssBuild: {
        cmd: 'mkdir -p ./resources/public/assets/css && npx stylus -m -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o ./resources/public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl'
      },
      kitchenSinkDevCssWatch: {
        cmd: 'mkdir -p ./resources/public/assets/css && npx stylus -w -m -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o ./resources/public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl'
      },
      kitchenSinkDevJsBuild: {
        cmd: 'npx webpack --config config/webpack.kitchen-sink.dev.js'
      },
      kitchenSinkProdCljsBuild: {
        cmd: 'lein with-profile prod do clean, cljsbuild once kitchen-sink'
      },
      kitchenSinkProdCssBuild: {
        cmd: 'mkdir -p ./resources/public/assets/css && npx stylus --hoist-atrules -u autoprefixer-stylus -u axis -u jeet -u rupture --include-css -o ./resources/public/assets/css/kitchen-sink.css ./src/stylus/kitchen-sink/index.styl && npx cleancss -o resources/public/assets/css/kitchen-sink.css resources/public/assets/css/kitchen-sink.css'
      },
      kitchenSinkProdJsBuild: {
        cmd: 'npx webpack --config config/webpack.kitchen-sink.prod.js'
      },
      kitchenSinkProdStaticServe: {
        cmd: 'npx serve --listen 3449 --single'
      }
    },
    sprite: {
      icons: {
        src: 'assets/icons/*.png',
        dest: 'resources/public/assets/images/icons-' + getCollectiveMd5('assets/images/icons/*.png') + '.png',
        destCss: 'src/stylus/core/icons.styl',
        imgPath: '../images/icons-' + getCollectiveMd5('assets/images/icons/*.png') + '.png'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sh');
  grunt.loadNpmTasks('grunt-spritesmith');

  // -- Kitchen Sink

  grunt.registerTask('kitchenSink:dev:assets:build', [
    'copy:fonts', 'copy:images', 'copy:kitchenSinkHtml'
  ]);

  grunt.registerTask('kitchenSink:dev:css:build', [
    'kitchenSink:dev:assets:build',
    'sprite',
    'sh:kitchenSinkDevCssBuild'
  ]);

  grunt.registerTask('kitchenSink:dev:css:watch', [
    'kitchenSink:dev:assets:build',
    'sprite',
    'sh:kitchenSinkDevCssWatch'
  ]);

  grunt.registerTask('kitchenSink:dev:cljs:build', [
    'kitchenSink:dev:js:build',
    'sh:kitchenSinkDevCljsBuild'
  ]);

  grunt.registerTask('kitchenSink:dev:cljs:buildClean', [
    'kitchenSink:dev:js:build',
    'sh:kitchenSinkDevCljsBuildClean'
  ]);

  grunt.registerTask('kitchenSink:dev:cljs:watch', [
    'kitchenSink:dev:js:build',
    'sh:kitchenSinkDevCljsWatch'
  ]);

  grunt.registerTask('kitchenSink:dev:cljs:watchClean', [
    'kitchenSink:dev:js:build',
    'sh:kitchenSinkDevCljsWatchClean'
  ]);

  grunt.registerTask('kitchenSink:dev:js:build', [
    'sh:kitchenSinkDevJsBuild'
  ]);

  grunt.registerTask('kitchenSink:prod:build', [
    'clean',
    'copy:fonts', 'copy:images', 'copy:kitchenSinkHtml',
    'sprite',
    'sh:kitchenSinkProdCssBuild',
    'sh:kitchenSinkProdJsBuild',
    'sh:kitchenSinkProdCljsBuild'
  ]);

  grunt.registerTask('kitchenSink:prod:build+run', [
    'kitchenSink:prod:build',
    'sh:kitchenSinkProdStaticServe'
  ]);

  grunt.registerTask('kitchenSink:prod:run', [
    'sh:kitchenSinkProdStaticServe'
  ]);
};
