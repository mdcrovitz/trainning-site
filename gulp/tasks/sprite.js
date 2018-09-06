/********************************
	File: d:\users\mdc\documents\websites\trainning-site.dev.cc\gulp\tasks\sprite.js
	Description: This gulp file assembles our icons into a single icon sprite
			file.
*********************************/
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');

/*
	Create an opbject literal configuration for svg
*/
var config = {
	mode: {
		css: {
			// Tell svgSprite to produce a css file that gives us all the css
			// code to render each icon from the assembled output file.
			render: {
				css: {
					// Provide the path to the template file to use for our css genereation
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

// Create a Gulp taks that does the assembly
gulp.task ('createSprite', function () {
	// Whenever using gulp.src, preface with the return
	return gulp.src ('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		// produce the output files
		.pipe(gulp.dest('./app/temp/sprite'));
});




/************************** End File: sprite.js ******************************/