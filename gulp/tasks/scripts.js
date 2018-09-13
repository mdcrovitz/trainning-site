/*********************************************

	File: d:\users\mdc\documents\websites\trainning-site.dev.cc\gulp\tasks\scripts.js
	Description: We create a gulp taks that watches all our javascripts files and
		if anything changes, then run webpack to re-bundle our js files, and refresh the
		browser.
**********************************************/

var gulp = require('gulp');
var webpack = require ('webpack');

gulp.task('scripts', function(callback) {
	// call webpack but give him an explicit parameter to the config file
	// as a 2nd parameter, provide a call back that gets called upon completion
	webpack(require ('../../webpack.config.js'), function(err, stats) {
		// check for errors
		if (err) {
			console.log(err.toString());
		}

		// Display the stats that webPack provides
		console.log (stats.toString());

		// Tell gulp that webpack is done
		callback();
	});
});