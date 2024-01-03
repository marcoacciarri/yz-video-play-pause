(function () {
	'use strict';

	// Function to check if the user has interacted with the document
	let userHasInteracted = false;
	const hasUserInteracted = (function () {
		return userHasInteracted;
	});

	// Create an Intersection Observer to play pause videos as they enter / exit view
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const video = entry.target;
			const player = new Vimeo.Player(video);

			player.ready().then(function () {
				if (entry.isIntersecting) {

					// Video is in view
					player.getMuted().then(function (muted) {
						console.log('muted: ', muted);

						if (muted) {
							// If muted, autplay
							player.play();
						}

						if (hasUserInteracted) {
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
	const videoElements = document.querySelectorAll('iframe[src^="https://player.vimeo.com"]');
	videoElements.forEach(function (element) {
		observer.observe(element);
	});

	// Function to check if top section is sticky
	let topSectionIsSticky = false;
	const hasTopStickySection = (function () {
		return topSectionIsSticky;
	});

	// Function to check if Elementor is in edit mode
	const isInElementorEditMode = (function () {
		return document.body.classList.contains('elementor-editor-active');
	});

	// Intersection observer that 
	const sectionObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {

			// Sticky Section has reached top
			if (entry.isIntersecting && entry.boundingClientRect.top <= 0) {

				// Add no scroll effect to body
				document.body.classList.add('no-scroll');

				// Stop observing the element
				observer.unobserve(entry.target);

				topSectionIsSticky = true;
			}
		});
	}, { threshold: [1.0] });

	// Get Elementor sections
	const sections = document.querySelectorAll('body:not(.elementor-editor-active) section.elementor-section');

	// Initialize top sticky section
	const initializeStickySection = (function () {
		if (sections.length > 0 && sections[0].classList.contains('make-sticky')) {

			// create css for .make-sticky class
			let style = document.createElement('style');
			style.type = 'text/css';
			style.id = 'make-sticky';
			const css = `
			/* class that makes element sticky */
			.make-sticky {
				position: -webkit-sticky;
				position: sticky;
				top: 0;
				z-index: 100; 
			}
			
			/* class for no scroll effect on element */
			.no-scroll {
				height: 100%;
				overflow: hidden;
			}`;

			style.appendChild(document.createTextNode(css));
			document.head.appendChild(style);

			// Observe element
			sectionObserver.observe(sections[0]);
		}
	});

	// Function to remove the stickiness on top section
	const removeStickySection = (function () {
		if (hasTopStickySection) {
			// Remove top section stickyness
			sections[0].style.position = "relative";

			// Remove body no scroll
			document.body.classList.remove('no-scroll');

			// Scroll to section after the top sticky section
			if (sections[1]) {
				sections[1].scrollIntoView({ behavior: 'smooth' });
			}

			// Set topSectionIsSticky flag to false so scrollIntoView doesn't happen again
			topSectionIsSticky = false;
		}

		// Set the userHasInteracted flag to true when a click event occurs
		// This is for the video autoplay functions
		userHasInteracted = true;
		console.log('userHasInteracted: ', userHasInteracted);
	});

	// Listen for a user click / tap event
	document.addEventListener('click', removeStickySection);
	document.addEventListener('touchstart', removeStickySection);

	initializeStickySection();
})();
