module.exports = function(grunt) {
  grunt.initConfig({

    /* uglify
     ********************************************/
    uglify: {
      main: {
        options: {
          mangle: false
        },
        files: [{
          'items/static/scripts/app.min.js': [
            'items/static/scripts/app.js',
            'items/static/scripts/controllers/*.js',
            'items/static/scripts/categories/*.js'
          ]
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build', ['uglify']);
};
