(function ($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 */

	// Create an Intersection Observer to play pause
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const video = entry.target;
			const player = new Vimeo.Player(video);

			player.ready().then(function () {
				if (entry.isIntersecting) {

					// Video is in view
					player.getMuted().then(function (muted) {

						if (muted) {
							// If muted, autplay
							player.play();
						} else if (hasUserInteracted) {
							// If not muted, autoplay only if user has interacted
							player.setVolume(1);
							player.play();
						}

					});

				} else {
					// Video is out of view, so pause it
					player.pause();
				}
			});
		});
	}, { threshold: 0.8 });

	// Observe the video elements
	const videoElements = $('iframe[src^="https://player.vimeo.com"]');
	videoElements.each(function () {
		observer.observe(this);
	});

	// Function to check if the user has interacted with the document
	const hasUserInteracted = (function () {
		return userHasInteracted;
	});

	let topSectionIsSticky = false;
	const hasTopStickySection = (function () {
		return topSectionIsSticky;
	});

	// Get Elementor sections
	const sections = document.querySelectorAll('section.elementor-section');

	// Manage is top section sticky
	const initializeStickySection = (function () {
		if (sections.length > 0 && sections[0].classList.contains('make-sticky')) {

			let style = document.createElement('style');
			style.type = 'text/css';
			const stickyClass = `.make-sticky {
				position: -webkit-sticky;
				position: sticky;
				top: 0;
				z-index: 100; 
			}`;

			if (style.styleSheet) {
				style.styleSheet.cssText = cssClass; // For IE
			} else {
				style.appendChild(document.createTextNode(stickyClass));
			}
			document.head.appendChild(style);

			topSectionIsSticky = true;
		}
	});

	// Listen for a user click event
	let userHasInteracted = false;
	$(document).on('click tap', function () {

		if (hasTopStickySection) {
			//Remove top section stickyness
			sections[0].style.position = "relative";

			// Scroll to section after the top sticky section
			if (sections[1]) {
				sections[1].scrollIntoView({ behavior: 'smooth' });
			}

			// Set topSectionIsSticky flag to false so scrollIntoView doesn't happen again
			topSectionIsSticky = false;
		}

		// Set the userHasInteracted flag to true when a click event occurs
		userHasInteracted = true;
	});

	initializeStickySection();

})(jQuery);
