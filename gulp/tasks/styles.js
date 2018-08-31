/*
	File: D:\zzWork\sites\trainning-site\\gulp\tasks\styles.js

	This file contains all the tasks related to our css files
*/

// First, we need any required used by this file
var gulp = require('gulp');

	// PostCss operates as a processor of a pipe stream, taking assorted filters
	// as arguments
var postcss = require('gulp-postcss');
	// autoprefixer is a postcss filter that prefixes browser prefixes to certian
	// css tags
var autoprefixer = require('autoprefixer');

	// cssvars is a postcss filter that lets us use variables in our css for
	// easier and more consistent coding
var cssvars = require('postcss-simple-vars');

	// postcss-nested let's us write css code with nested feature, and this filter will
	// expand that
var nested = require('postcss-nested');

	// postcss-import is another filter that provides for design time import operation
var cssImport = require('postcss-import');

	// Include our mixins package
var mixins = require('postcss-mixins');


// gulp.task takes 2 params:
// Name of task
// funtion to perform when task invoked
//
// There is also an optional 2nd parameter, which is an array of tasks
// that are a dependency to the function. Therefor, any depedenncies
// to the function must run and complete before the task function runs.
// See the cssInject task as an example of this.




// Task thata runs the postcss and collects all our css files
gulp.task('styles', function(){

	// we use the return prefix due to asynchrous nature of gulp
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
		// handle errors. All script errors that occur, must go through here.
		.on('error', function(errorInfo) {
			// here is where we handle any and all script errors
			console.log(errorInfo.toString());

			// gracefully ends the current task instance, not the entire proces
			this.emit('end');

		})
		.pipe(gulp.dest('./app/temp/styles'));
});
