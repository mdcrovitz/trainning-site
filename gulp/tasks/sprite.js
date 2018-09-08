/********************************
	File: d:\users\mdc\documents\websites\trainning-site.dev.cc\gulp\tasks\sprite.js
	Description: This gulp file assembles our icons into a single icon sprite
			file.
*********************************/
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');

/*
	Create an opbject literal configuration for svg
*/
var config = {
	mode: {
		css: {
			// Tell svgSprite where to place our output svg file. We want to remove the
			// name fragment .css as in the filenamne: sprite.css-d675eadb.svg
			sprite: 'sprite.svg',

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
};

/*
	One problem we have with the icons task is that obsolete copies of the final
	sprite*.svg files don't get cleaned up so the output folder accumulates lots
	of old files. This task beginClean corrects that problem, but we'll need a new
	npm package to help wit hthe folder delete operation -- del
*/
gulp.task ('beginClean', function () {
	return del(['./app/temp/sprite', './app/assets/images/sprites'])
/*		.then(paths => {
		console.log('beginClean:  Deleted files and folders:\n', paths.join('\n'));
	}) */ ;
});


/*
	The svgSprite function has done everything to create and build our
	two sprint files the .svg and the .css, and these files have been moved
	to the proper folders within our assets. Hence we no longer need the
	temp\sprite folder, so we delete that now.
*/
gulp.task ('endClean', ['copySpriteCSS', 'copySpriteGraphic'], function() {
	return del('./app/temp/sprite');
});
// Create a Gulp taks that does the assembly
gulp.task ('createSprite', ['beginClean'], function () {
	// Whenever using gulp.src, preface with the return
	return gulp.src ('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))

		// handle errors. All script errors that occur, must go through here.
		.on('error', function(error) {
			// here is where we handle any and all script errors
			console.log(error.toString());

			// gracefully ends the current task instance, not the entire proces
			this.emit('end');
		})

		.pipe(gulp.dest('./app/temp/sprite'))


});

/*
	svgSprite has no idea how we're organizing our files. Specifically, we
	have an css include folder or d:\users\mdc\documents\websites\trainning-site.dev.cc\app\assets\styles
	and we'd like all our css that we bundle up in that one place. So here
	we create another gulp task to perform that operation.

	Also, our convention uses the underscore charact for all our style module files
	so we'll also rename our sprite file at the same time.
*/
gulp.task ('copySpriteCSS', ['createSprite'], function () {
	return gulp.src('./app/temp/sprite/css/*.css')
		// use the rename package to give out output file a fresh name
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest ('./app/assets/styles/modules'));
})

/*
	svgSprite will place the generated .svg file in a location of his own
	preference, but sinilar to the copy above we'd like the svg file to
	exist in our assets\images folder along with all the other images.
	So here we create a copy taske to accomplish that feat.
*/
gulp.task ('copySpriteGraphic', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

/*
	Now we wrap up the to above two tasks into a taske that does then both.
	However, this task mode runs the dependacies asynchronously, that is,
	they will intersperce and the create is not assured to complete before
	the copy begins. therefore, we need to add the dependency to the copy task
	as well.

	NOTE: We don't need to include the create task below becasue
	when we run the copy task, the copy wil first run its dependency. We could
	therefore not have this icons task and simply use the command line gulp copySpriteCSS
	to do the create & build, but then we have a bad name for the full deal.
*/
gulp.task ('icons', [ 'copySpriteCSS', 'copySpriteGraphic', 'endClean']);



/************************** End File: sprite.js ******************************/