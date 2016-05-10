'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    shell: {
      npmstart: {
        command: 'npm start',
        options: {
            async: false
        }
      },
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['shell:npmstart'],
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell-spawn'); // remove
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.registerTask('build', function(arg) {
  //   arg = arg || 'dev';
  //   if (arg === 'dev') {
  //     console.log("GRUNT DEV RUNNING...");
  //     grunt.task.run(['clean','jshint','concat:js','sass','cssmin','concurrent:dev']);
  //   } else if (arg === 'dist') {
  //     console.log("GRUNT DIST RUNNING...");
  //     grunt.task.run(['clean','jshint','uglify:dist','sass','cssmin','concurrent:dist']);
  //   }
  // });

  // grunt.registerTask('serve', function(arg) {
  //   arg = arg || 'dev';
  //   grunt.task.run(['build:'+arg, 'concurrent:dev']);
  // });

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concurrent:dev']);

  // Just start the server (only)
  grunt.registerTask('serve', ['shell:npmstart']);



};
