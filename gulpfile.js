/***
	File:  D:\zzWork\sites\trainning-site\gulpfile.js
	Description:	This is the main gulp control gulp file for our system.
		All that we really need here will be to include all the modules.
****/
	// include tasks that manage our css files
require('./gulp/tasks/styles');	// '.js' inferred in required command

// include tasks that does all our watching
require('./gulp/tasks/watch');

// Include file for our icon sprite support
require ('./gulp/tasks/sprite');

require ('./gulp/tasks/scripts');
