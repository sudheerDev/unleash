'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Set up mod_rewrite
  var modRewrite = require('connect-modrewrite');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    env: process.env.UNLEASH_ENV,
    mail: process.env.MANDRILL_KEY,
    slack: process.env.BOT_URL,
    skills: process.env.SKILLS_URL,
    goals: process.env.GOALS_URL,
    paths: process.env.PATHS_URL,
    profiles: process.env.PROFILES_URL,
    buildNumber: process.env.TRAVIS_BUILD_NUMBER,
    mixpanelAnalyticsEnabled: process.env.MIXPANEL_ANALYTICS_ENABLED,
    defaultPictureUrl: process.env.DEFAULT_PICTURE_URL,
    zapier: process.env.ZAPIER_WEBHOOK_URL
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    unleash: appConfig,

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'UNLEASH_ENV',
              replacement: '<%= unleash.env %>'
            },
            {
              match: 'MANDRILL_KEY',
              replacement: '<%= unleash.mail %>'
            },
            {
              match: 'BOT_URL',
              replacement: '<%= unleash.slack %>'
            },
            {
              match: 'SKILLS_URL',
              replacement: '<%= unleash.skills %>'
            },
            {
              match: 'GOALS_URL',
              replacement: '<%= unleash.goals %>'
            },
            {
              match: 'PATHS_URL',
              replacement: '<%= unleash.paths %>'
            },
            {
              match: 'PROFILES_URL',
              replacement: '<%= unleash.profiles %>'
            },
            {
              match: 'TRAVIS_BUILD_NUMBER',
              replacement: '<%= unleash.buildNumber %>'
            },
            {
              match: 'MIXPANEL_ANALYTICS_ENABLED',
              replacement: '<%= unleash.mixpanelAnalyticsEnabled %>'
            },
            {
              match: 'DEFAULT_PICTURE_URL',
              replacement: '<%= unleash.defaultPictureUrl %>'
            },
            {
              match: 'ZAPIER_WEBHOOK_URL',
              replacement: '<%= unleash.zapier %>'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              '<%= unleash.app %>/scripts/constants-template.js'
            ],
            dest: '<%= unleash.app %>/scripts/',
            rename: function(dest) {
              return dest + 'constants.js';
            }
          }
        ]
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= unleash.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      unitTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:unitTest', 'karma']
      },
      e2eTest: {
        files: ['test/e2e/{,*/}*.js'],
        tasks: ['newer:jshint:e2eTest', 'protractor']
      },
      compass: {
        files: ['<%= unleash.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= unleash.app %>/{,*/,*/*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= unleash.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.gif|\\.swf|\\.woff|\\.ttf$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= unleash.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= unleash.app %>/scripts/{,*/}*.js'
        ]
      },
      unitTest: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      },
      e2eTest: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/e2e/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= unleash.dist %>/{,*/}*',
            '!<%= unleash.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= unleash.app %>/index.html'],
        exclude: [ /angular-translate/, /qunit/],
        fileTypes: {
          html: {
            replace: {
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        },
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= unleash.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= unleash.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= unleash.app %>/images',
        javascriptsDir: '<%= unleash.app %>/scripts',
        fontsDir: '<%= unleash.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= unleash.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= unleash.dist %>/scripts/{,*/}*.js',
          '<%= unleash.dist %>/styles/{,*/}*.css',
          '<%= unleash.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= unleash.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= unleash.app %>/index.html',
      options: {
        dest: '<%= unleash.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= unleash.dist %>/{,*/}*.html'],
      css: ['<%= unleash.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= unleash.dist %>','<%= unleash.dist %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= unleash.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= unleash.dist %>/scripts/scripts.js': [
    //         '<%= unleash.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= unleash.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= unleash.dist %>/images'
        }]
      }
    },

    //svgmin: {
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%= unleash.app %>/images',
    //      src: '{,*/}*.svg',
    //      dest: '<%= unleash.dist %>/images'
    //    }]
    //  }
    //},

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= unleash.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= unleash.app %>',
          dest: '<%= unleash.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{svg,webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= unleash.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= unleash.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin'
        //'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    protractor: {
      e2e: {
        configFile: 'test/protractor.conf.js',
        keepAlive: true
      }
    }
  });

  grunt.log.writeln('Current environment:', appConfig.env || 'staging');

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'replace',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'jshint:all',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('test:e2e', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'protractor'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'replace',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
