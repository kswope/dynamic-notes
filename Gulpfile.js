var gulp = require( 'gulp' );
var exec = require('gulp-exec');
var livereload = require('gulp-livereload');

var EXPRESS_PORT = 3000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

// Let's make things more readable by encapsulating each part's setup in its
// own method
function startExpress() {
  var express = require('express');
  var app = express();
  app.use(express.static(EXPRESS_ROOT));
  app.listen( EXPRESS_PORT );
}

// Notifies livereload of changes detected by `gulp.watch()` 
function notifyLivereload( event ) {

  // `gulp.watch()` events provide an absolute path so we need to make it
  // relative to the server root
  // var fileName = require( 'path' ).relative( EXPRESS_ROOT, event.path );

  gulp.src( '' )
    .pipe( exec( './content_combine.rb' ) )
    .pipe( livereload() );

}

// Default task that will be run when no parameter is provided to gulp
gulp.task( 'default', function() {
  startExpress();
  livereload.listen();
  gulp.watch( [ 'index.html',
                'content/*.js',
                'content/*.rb',
                'content_combine.rb', 
                'css/main.css', 
                'js/main.js', 
                'content.js' ], notifyLivereload );
} );
