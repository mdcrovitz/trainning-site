/*
	File: D:\Users\mdc\Documents\Websites\trainning-site.dev.cc\gulp\tasks\watch.js
	Description:	This file contains all tasks related to
		watch operations
*/

var gulp = require('gulp');
var watch = require('gulp-watch');

	// browser-sync to refresdh browser upon changes. We need to require only
	// a single method, create
var browserSync = require('browser-sync').create();


gulp.task('watch', function() {

	// Remind use that Desktop Server needs to be runnin
	console.log('*****************************************');
	console.log('*       R E M E M B E R   ! !           *');
	console.log('* Desktop Servers needs to be running.  *');
	console.log('*****************************************');

	// Set up some browser stuff that occurs within our watch
	// first init some things
	browserSync.init({
		// locate the first page of our website (index.html)
		// notify: false,	// disables the notify nessage BrowserSync places on resynched
						// pages

		// User either the server OR the proxy object, not both

		proxy: {
			// target: "http://trainning-site.dev.cc/app/index.html",
			target: "http://trainning-site.dev.cc/",
			ws: true		// using websockets ?
		}
/*

		server: {
			baseDir: "./app"
		}
*/
	});


	// The watch plugin takes 2 parameters,
	// first the file we want to watch
	// function to perform when file gets changed
	// Be sure you use reverse slashes here as this is mostly a unix thing.
	watch('./app/index.html', function() {
		// gulp.start('html');
		browserSync.reload();	// refresh the brower window
	});


// gulp.task takes 2 params:
// Name of task
// funtion to perform when task invoked
//
// There is also an optional 2nd parameter, which is an array of tasks
// that are a dependency to the function. Therefor, any depedenncies
// to the function must run and complete before the task function runs.
// See the cssInject task as an example of this.



	// Install another set of files to watch -- all our futurte css files
	// Note the idiom for sub folders /**/ which means 0 or more sub folders
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});

	// Whenever a a change is saved to a javascript file,
	watch ('./app/assets/scripts/**/*.js', function () {
		gulp.start ('scriptsRefresh');
	})
});

// BrowserSynch has the ability to automatically inject new CSS into the browser
// page, I guess it does this by causing a partial refresh of the contents that involves
// the link tag

gulp.task('cssInject', ['styles'], function() {

	// take the compiled css, give this to the browserSync
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});

// Our scriptRefresh task will run our scripts task as a dependancy, then
// reload our page
gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
})

