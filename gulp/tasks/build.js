/*******************************************

	file: d:\users\mdc\documents\websites\trainning-site.dev.cc\gulp\tasks\build.js

	Description: This will be our gulp taks that creates our release version of
			our site. It minimized js, css, and image files, and copies all production
			files to our dist folder. We'll use a new npm package gulp-imagemin to compress
			images.

*********************************************/
var gulp = require("gulp");
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require("gulp-usemin");

// Clead our destination folder at the start so we begin each build fresh
gulp.task ("deleteDistFolder", function() {
	return del(".dist");
})

// Copy and compress all image files
gulp.task ('optimizeImages',['deleteDistFolder'], function () {
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
		.pipe(gulp.dest("./dist/assets/images"));
});

/* Getting ready to take our 3 files, a style.css, vendor.js, an app.js, and
	compress, copy, and version them. A new npm plugin usemin, does this all
	for us.
*/
gulp.task ("usemin", ['deleteDistFolder'], function () {
	return gulp.src("./app/index.html")
		.pipe(usemin())
		.pipe(gulp.dest("./dist"));
});


gulp.task ('build', ['deleteDistFolder', 'optimizeImages', 'usemin'])	;

/******************* End File: build.js ********************************/

