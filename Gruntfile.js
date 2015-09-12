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
          'items/static/app/app.min.js': [
            'items/static/app/app.js',
            'items/static/app/main/**/*.js',
            'items/static/app/categories/**/*.js',
            'items/static/app/items/**/*.js'
          ]
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build', ['uglify']);
};
