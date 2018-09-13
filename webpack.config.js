/************************************
	File: d:\users\mdc\documents\websites\trainning-site.dev.cc\webpack.config.js
	Description: This is teh webpack config file. It is the default locationb and name,
			so we don't need to launch webpack with special options.
*************************************/


	// The following includes a part of nodejs core and gives us some path an dir functions
var pathjs = require('path');


module.exports = {
		// set internal webpack optimations to development
	mode: 'development',

		// entry specs out the intial source file
	entry:  "./app/assets/scripts/app.js",

		// output specs where the output goes, it is an object with a path and
		// filename name
	output: {
		// pathjs.resolve joins 2 strings, and make then a good path for the os we're using
		// __dirname is a define of the path to this config file
		path: pathjs.resolve(__dirname, "./app/temp/scripts"),
		filename: "app.js"
	}
/****************************
	NOTE:
	The following is all for the Babel stuff which transpiles ES6 into ES5. Being that we're
	now in 2018, and ES6 is a healthy 4 years old, and all the browsers we're interested in
	are now 99% ES6 compatible, we go ES6 native full bore -- no need to transpile and hence
	no need for Babel


		// The following is for babel;
	module: {
		// The Schiff versoin used
		// loaders: [
		// but we need the following for our version
		rules: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				exclude: /node-modules/
			}
		]
	}
***********************************/
}