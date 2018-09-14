/****************************************************
	File:  d:\users\mdc\documents\websites\trainning-site.dev.cc\app\assets\scripts\App.js

*****************************************************/

import MobileMenu from './modules/mobilemenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from "jquery";

// Instantate our object
var mobileMenu = new MobileMenu();

// Instantiate our RevealOnScroll class.
// Once for the featured items and
// Once for the Testimonials.
// Give each theor oun waypoint's offset

new RevealOnScroll ($(".feature-item"), "85%");
new RevealOnScroll ($(".testimonial"), "60%");