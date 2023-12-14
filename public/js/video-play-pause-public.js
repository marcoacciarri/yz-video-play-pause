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
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
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

	// Listen for a user interaction event, e.g., a click
	let userHasInteracted = false;
	$(document).on('click tap', function () {
		// Set the userHasInteracted flag to true when a click event occurs
		userHasInteracted = true;
	});

})(jQuery);
