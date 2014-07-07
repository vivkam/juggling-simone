module.exports = function (grunt) {

  grunt.initConfig({
    clean : {
      bower : [ 'bower' ],
      dev : [ 'lib' ],
      dist : [ 'dist' ]
    },
    copy : {
      dev : {
        files : [
          { src : 'bower/bootstrap/dist/css/bootstrap.css' , dest : 'lib/css/bootstrap.css' },
          { src : 'bower/bootstrap/dist/css/bootstrap.css.map' , dest : 'lib/css/bootstrap.css.map' },
          { src : 'bower/bootstrap/dist/css/bootstrap-theme.css' , dest : 'lib/css/bootstrap-theme.css' },
          { src : 'bower/bootstrap/dist/css/bootstrap-theme.css.map' , dest : 'lib/css/bootstrap-theme.css.map' },
          { src : 'bower/bootstrap/dist/js/bootstrap.js' , dest : 'lib/js/bootstrap.js' },
          { src : 'bower/bootstrap-tagsinput/dist/bootstrap-tagsinput.css' , dest : 'lib/css/bootstrap-tagsinput.css' },
          { src : 'bower/bootstrap-tagsinput/dist/bootstrap-tagsinput.js' , dest : 'lib/js/bootstrap-tagsinput.js' },
          { src : 'bower/jquery/dist/jquery.js' , dest : 'lib/js/jquery.js' },
          { src : 'bower/random/lib/random.js' , dest : 'lib/js/random.js' }
        ]
      },
      dist : {
        src : [ 'index.html' , 'css/**' , 'img/**' , 'js/**' , 'lib/**' ],
        dest : 'dist/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-install-simple');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [ 'clean:bower' , 'clean:dev' , 'bower-install-simple' , 'copy:dev' , 'clean:bower' ]);
  grunt.registerTask('dist', [ 'default' , 'clean:dist' , 'copy:dist' ]);
};