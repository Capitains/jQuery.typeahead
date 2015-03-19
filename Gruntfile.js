module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["./dist"],
    uglify: {
      options : {
        //beautify : true -> Need to figure out this stuff
      },
      all: {
        files: {
          'dist/jquery.cts.typeahead.min.js': ['dist/jquery.cts.typeahead.js'],
        }
      }
    },
    concat: {
      all: {
        files : {
          'dist/jquery.cts.typeahead.js' : ['src/plugins/jquery.cts.typeahead.js' , 'src/i18n/*.js']
        }
      }
    },
    jslint: {
      all: ['src/*.js', 'src/**/*.js']
    },
    jasmine : {
      src : [
        'src/cts.js',
        'src/modules/**.js',
        'src/i18n/**.js', 
        'src/services/**.js',
        'src/endpoints/**.js', 
        'src/xslt/**.js',
      ],
      options : {
        vendor: [
          'node_modules/jasmine-ajax/lib/mock-ajax.js',
          'node_modules/jasmine-expect/dist/jasmine-matchers.js',
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
          'spec/javascripts/.helper.js'
        ],
        specs : 'spec/**/*.specs.js',
        keepRunner : true
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        options : {
          singleRun : true,
          browsers : ["PhantomJS"]
        }
      }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-release');

  // Default task. 
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('build', ['default']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('rel', ['build', 'release']);
};
