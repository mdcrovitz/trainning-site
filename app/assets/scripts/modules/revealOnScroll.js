/****************************************
	File: d:\users\mdc\documents\websites\trainning-site.dev.cc\app\assets\scripts\modules\revealOnScroll.js
	Description: For lesson 47 on how to reveal some page elements when they get scrolled
			into view. For this lesson, we're working with our Featured Items.

*****************************************/
import $ from "jquery";

	/* Importing the waypoints requires that we explicitly point to the nodes */
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class RevealOnScroll {
	constructor (els, offset) {
		// Create properties for items that we'll want to reveal
		this.itemsToReveal = els;

		// Hide our Featured Items
		this.hideInitially();

		// Save the offset callinf parameter
		// NOTE: We need this property before the createWaypoints gets called
		// since the method needs the offsetPercentage
		this.offsetPercentage = offset;

		// Create our Waypoints
		this.createWaypoints();

	}

	hideInitially () {
		this.itemsToReveal.addClass ("reveal-item");
	}

	/* Use the waypoints plugin to create references to our 4 Feature Items. wse already
		have all 4 elements in our property this.itemsToReveal. So we want to call an
		iterator on this object, each. The each method takes a paramter of function that
		gets applied once to each item of the collection.
	*/
	createWaypoints() {
		// remember who this is (our class at this instance
		var that = this;

		this.itemsToReveal.each(function() {
			var currentItem = this;		// this now points to the object of the each
			new Waypoint({
				element: currentItem,
				handler: function () {
					$(currentItem).addClass("reveal-item--is-visible");
				},
				// Tweak so that we activate the handler earlier than th defauls
				// when the top of the object hits the top of the browser window.
				// Set value on a scale where the top of the elements hits the top
				// of the screen as 0 and the top of the element hitting the bottom of
				// screen as 100%
				offset: that.offsetPercentage
			});
		});

	}


}

export default RevealOnScroll;



/************************ End File: revealOnScroll.js **********************/