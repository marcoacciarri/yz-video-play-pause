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

	// Create an Intersection Observer
	const options = {
		threshold: 0.5, // Adjust this threshold as needed
	};

	const observer = new IntersectionObserver((entries) => {
		console.log(entries);
		entries.forEach((entry) => {
			const videoElement = entry.target;
			const videoPlayer = new Vimeo.Player(videoElement);
			console.log(videoPlayer.getVideoTitle());

			if (entry.isIntersecting) {
				// Video is in view, so play it
				console.log('visible');
				videoPlayer.play();
			} else {
				// Video is out of view, so pause it
				console.log('not visibile');
				videoPlayer.pause();
			}
		});
	}, options);

	// Observe the video elements
	const videoElements = $('iframe[src^="https://player.vimeo.com"]');
	console.log(videoElements)
	videoElements.each(function () {
		observer.observe(this);
	});

})(jQuery);
