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
      }
    },
    copy: {
      dev: {
        files: [{
          src: 'node_modules/font-awesome/css/font-awesome.css',
          dest: 'styles/vendor/dist/font-awesome.css'
        }, {
          expand: true,
          cwd: 'node_modules/font-awesome/fonts',
          src: '**/*',
          dest: 'resources/public/assets/fonts'
        }, {
          expand: true,
          cwd: 'assets',
          src: ['**/*', '!icons/**/*'],
          dest: 'resources/public/assets'
        }, {
          expand: true,
          cwd: 'assets-dev',
          src: '**/*',
          dest: 'resources/public/assets'
        }, {
          expand: true,
          cwd: 'src/html',
          src: ['devcards.html', 'kitchen-sink.html'],
          dest: 'resources/public'
        }]
      }
    },
    sprite: {
      icons: {
        src: 'assets/icons/*.png',
        dest: 'resources/public/assets/images/icons-' + getCollectiveMd5('assets/images/icons/*.png') + '.png',
        destCss: 'styles/icons.styl',
        imgPath: '../images/icons-' + getCollectiveMd5('assets/images/icons/*.png') + '.png'
      }
    },
    stylus: {
      options: {
        'include css': true,
        use: [
          require('autoprefixer-stylus'),
          require('axis'),
          require('jeet'),
          require('rupture')
        ]
      },
      dev: {
        options: {
          compress: false,
          sourcemap: {
            inline: true
          }
        },
        files: {
          'resources/public/assets/css/devcards.css': 'styles/devcards.styl',
          'resources/public/assets/css/kitchen-sink.css': 'styles/kitchen-sink.styl'
        }
      },
      prod: {
        files: {
          'resources/public/assets/css/nebula-widgets.css': 'styles/index.styl'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-spritesmith');

  // Task for 'dev' environment.
  grunt.registerTask('dev:build:assets', ['clean', 'copy:dev', 'sprite', 'stylus:dev']);
  grunt.registerTask('dev:build', ['dev:build:assets']);

  // Task for 'prod' environment.
  grunt.registerTask('prod:build:assets', ['clean', 'copy:prod', 'sprite', 'stylus:prod']);
  grunt.registerTask('prod:build', ['prod:build:assets']);
};
