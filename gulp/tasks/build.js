/*******************************************

	file: d:\users\mdc\documents\websites\trainning-site.dev.cc\gulp\tasks\build.js

	Description: This will be our gulp taks that creates our release version of
			our site. It minimized js, css, and image files, and copies all production
			files to our dist folder. We'll use a new npm package gulp-imagemin to compress
			images.

			We also do a complet build of our icons, scripts and css.

			Last, we fire up a browser sync to view the distribution build


			NOTE!!! We refer to our releast folder as dist, but we're going to use
			the github web hosting so the folder needs to be named docs. All referenmces to
			dist get changed to docs.

*********************************************/
var gulp = require("gulp");
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require("gulp-usemin");
var rev = require('gulp-rev');
var cssnano = require ('gulp-cssnano');
var uglify = require ('gulp-uglify');

	// browser-sync to refresdh browser upon changes. We need to require only
	// a single method, create
var browserSync = require('browser-sync').create();


// This is the task that previews in a browser our final docs build
gulp.task ('previewDocs', function () {
		// Set up some browser stuff that occurs within our watch
	// first init some things
	browserSync.init({
		// locate the first page of our website (index.html)
		// notify: false,	// disables the notify nessage BrowserSync places on resynched
						// pages

		// User either the server OR the proxy object, not both

		proxy: {
			// target: "http://trainning-site.dev.cc/app/index.html",
			target: "http://trainning-site.dev.cc/docs/index.html",
			ws: true		// using websockets ?
		}
/*

		server: {
			baseDir: "./app"
			 or use for our doc distribution
			 basedir: "docs"
		}
*/
	});


});



// Clead our destination folder at the start so we begin each build fresh
gulp.task ("deleteDocsFolder", ['icons'], function() {
	return del("./docs").then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});

// The following, copyGeneralFiles, will exclude everythign we know about, and whatever
// is left over gets copied to the output. This let's us leave this task, and not
// have any problems, it will copy anything extra we place in our apps folder, but not
// cry if there is nothing.
gulp.task('copyGeneralFiles', ['deleteDocsFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',		// Begin with copying everything
		'!./app/index.html',	// our usemin copies this file
		'!./app/assets/images/**', // our OptimizeImages task gets these files
		'!./app/assets/styles',
		'!./app/assets/styles/**',		// our usemin task get our styles

		'!./app/assets/scripts',
		'!./app/assets/scripts/**',	// usemin

		// To exclude the temp folder, we need to reference both the
		// folder and its contents
		'!./app/temp',		// usemin
		'!./app/temp/**'
	];

	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./docs'));
});


// Copy and compress all image files
gulp.task ('optimizeImages',['deleteDocsFolder'], function () {
	return gulp.src([
		'./app/assets/images/**/*',
		'!./app/assets/images/icons',
		'!./app/assets/images/icons/**/*'
	])
		.pipe(imagemin({
			progressive: true,	// improves optimization
			interlaced: true,
			multipass: true		// targets for svg file
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

// We build an intermedary task that let's us set up dome dependencies
gulp.task ('useminTrigger', ['deleteDocsFolder'], function () {
	gulp.start ("usemin");
});



/* Getting ready to take our 3 files, a style.css, vendor.js, an app.js, and
	compress, copy, and version them. A new npm plugin usemin, does this all
	for us. The versioning requjires 3 more npm plugins
		gulp-rev
		gulp-cssnano,
		guld-uglify

	In addition, we'll add some dependicies to rebuild our styles, and
	javascript
*/
gulp.task ("usemin", ['styles', 'scripts'], function () {
	return gulp.src("./app/index.html")

		.pipe(usemin({
			css: [function () {return rev()}, function () {return cssnano()}],
			js: [function () {return rev()}, function () {return uglify()}]
		}))

		.pipe(gulp.dest("./docs"));
});


gulp.task ('build', ['deleteDocsFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);

/******************* End File: build.js ********************************/

