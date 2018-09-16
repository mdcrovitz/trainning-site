/****************************************************
	File: d:\users\mdc\documents\websites\trainning-site.dev.cc\app\assets\scripts\modules\StickyHeader.js

	Description: Used for lessons 48-49 to build the sticky header. The key
			is that the background for the header is fine while the page is at
			its top, but once scrolling begins, the header background becomes
			too light against the lighter page backgrounds, and makes menu hard
			to read. So our goal is to drarken the background once the page has
			scrolled u0p a bit.

			Lesson 50 we implement a breadcrumb system so menu items get highlighted
			when we're on that page. We've installed id's in the menu items, and a
			custom css tag in the desgination sections, and we write the js code code.

			This js file also implements Smooth Scroling, an add-in to jquery.

******************************************************/
import $			from "jquery";

	/* Importing the waypoints requires that we explicitly point to the waypoint node */
import waypoints 	from "../../../../node_modules/waypoints/lib/noframework.waypoints";

	/* Add support for our smooth scrolling */
import 	smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor () {
		// Save a property to the class which we want to be sticky
		this.siteHeader = $(".site-header");

		// We'll use this element as our trigger. That is, when the "Your Clarity"
		// text hits to top of the screen.
		this.headerTriggerElement = $('.large-hero__title');

		// Set our Waypoint within the constructor
		this.createHeaderWaypoint();

		// Create a list of all target sections. These are our 'Our Beginnings', 'Features',
		// and 'testionials' sections. We note that each of these contains a page-section class
		// so get a list all those.
		this.pageSections = $(".page-section");

		// In order to make our breadcrumb thing work, we're going to need to
		// highlight only one nav menu item at a time. To accomplish that, our
		// approach will be to reset all highlights before we set anythng upon a
		// Waypoint trigger. So we get all a tags, within a primary-nav class. Remember,
		// we need this property before the method createPageSectionWaypoints, becasue
		// that method need this list to reset them.
		this.headerLinks = $(".primary-nav a");

		// Create the Waypoints for our sections
		this.createPageSectionWaypoints();

		// instantiate our smooth scrolling
		this.addSmoothScroll();
	}

	// Add our smoth scrolling method
	// It is very simple, just give the jquery smooth scroll, a list of links we want
	// to apply the smooth scrolling to. And this list is readily available to us.
	addSmoothScroll () {
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint () {
		var that = this;		// Remember from whence we came
		new Waypoint({
			/*
				A special tweak between jquery and javascript. Our
				headerTriggerElement is a jquery object, but the
				Waypoint element want a pointer to the DOM object. It
				turns out that jquery objectgs are simply arrays and that
				the first element of that array is always a poionter to the
				DOM object. Se, we'll dereference the headerTriggerElement
				and provide the DOM object.

				Also, we want to be able to undo the background when the
				trigger element scrolls back down to its 'normal' position.
				We use the direction parameter to accomplish this.

				Last, with regard to scope and this/that:
				When we use "this" while defining a property "this" will point
				towards what we'd expect it to.
				When we use "this" while defining a method/function "this"
				will point towards that function it lives within.
			*/
			element: this.headerTriggerElement[0],	// Why arn't we using that?
			handler: function (scrollDirection) {
				if (scrollDirection == "down") {
					that.siteHeader.addClass("site-header--dark");
				} else {
					that.siteHeader.removeClass("site-header--dark");
				}
			}
		});
	}

	// Creat the waypoints for our sections that will get bookmarked
	createPageSectionWaypoints () {
		// Remember our this that points to StickyHeader class
		var that = this;

		// for each of our 3 sections
		this.pageSections.each(function () {
			// Remember our this
			var currentPageSection = this;	// this now points to the object of the each

			// Build our set of Wayponts when we are scrolling down (the images are
			// moving up. And set the offset to ~20. So this means, when about 80%
			// of a section gets scrolling into view from the bottom, we'll fire our
			// trigger.
			new Waypoint ({
				element: currentPageSection,
				handler: function (scrollDirection) {
					if (scrollDirection == "down") {
						// Retrieve our custom css attributrre value
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");

						// reset all nav list items
						that.headerLinks.removeClass("is-current-link");

						// Add a custom class to the menu item that triggered our Waypoint
						// this class belongs in _primary-nav.css
						$(matchingHeaderLink).addClass("is-current-link");
					}

				},
				// Customize how early or late in the scroll to fire the trigger
				// 0 --> element touches top of browser
				// 100% --> element touches bottom of browser
				// using 18% means with top is within 18% of top, trigger
				offset: "18%"
			});

			// Create a second set of Waypoints for when we're scrolling up, which means the
			// iomages are moving down the borwser. And in this case, when the top of the
			// element is 40% above the browser, or ouytside the browser's view.
			new Waypoint ({
				element: currentPageSection,
				handler: function (scrollDirection) {
					if (scrollDirection == "up") {
						// Retrieve our custom css attributrre value
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");

						// reset all nav list items
						that.headerLinks.removeClass("is-current-link");

						// Add a custom class to the menu item that triggered our Waypoint
						// this class belongs in _primary-nav.css
						$(matchingHeaderLink).addClass("is-current-link");
					}

				},
				// Customize how early or late in the scroll to fire the trigger
				// 0 --> element touches top of browser
				// 100% --> element touches bottom of browser
				offset: "-40%"
			});
		});
	}
}

export default StickyHeader;

/************************* End File: StickyHeader.js **********************/