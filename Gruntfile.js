module.exports = function(grunt) {
  grunt.initConfig({

    config: {
      title: 'disaster_kit',
      date: function() {
        var d = new Date();
        return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      }
    },

    /* uglify
     ********************************************/
    uglify: {
      main: {
        options: {
          mangle: false,
          banner: '/* <%= config.title %> | built on <%= config.date() %> */'
        },
        files: [{
          'items/static/app/app.min.js': [
            'items/static/app/app.js',
            'items/static/app/main-controller.js',
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
