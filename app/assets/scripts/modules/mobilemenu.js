/**************************************
	File:	d:\users\mdc\documents\websites\trainning-site.dev.cc\app\assets\scripts\modules\mobilemenu.js
	Description: This file will build the mobil menu icon. That is the classical 3 horizontal
		bars.

	Our approach is that on small screens, when the icon does get clicked, we'll add a class
	to our site-header__menu-icon div and we'll manage menu with that now added new class.

***************************************/

// import jquery to access the DOM
import $ from 'jquery';


class MobileMenu {
	// modularize our code so that we separate:
	//	DOM
	//	Event handling
	//	Functionality
	constructor () {
		// Get the DOM objects -- based upon its class
		this.menuIcon = $(".site-header__menu-icon");	// This is the 3-bar icon
		this.menuContent = $(".site-header__menu-content");	// class that shows the menu

		// Call our events functions which listens for events we'rfe intgerested in
		this.events();
	}

	/*
		NOTE:
			It becomes important to note how javascript manages the 'this' reference.
			Javascrips sets this to the object of the containner. So the this in the
			constructors is refering to the parent object or the MobilMenu object.
			However the this in the toggleTheMenu function got set in the function
			contained within events() on the line this.menuIcon.click, so in that case,
			the parameter this got set to the parent object or the the MobileMenu, so
			javascript new where to find the function. But within that togleTheMenu function,
			the this reference gets set to the parent or the object that triggered the
			event -- menuIcon.

			To overcome this problem, from withing our events() function, our event handlers
			get called with some adornment, the bind method. See the article:
			https://stackoverflow.com/questions/36489579/this-within-es6-class-method
			for a better explaination.
	*/


	// List all events we'll be interested in
	events () {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	// Provide functions that do our real work, called by the events or whatever
	toggleTheMenu() {
		this.menuContent.toggleClass ("site-header__menu-content--is-visible");
	}
}

export default MobileMenu;