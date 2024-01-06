(function () {
	'use strict';

	// Function to check if the user has interacted with the document
	let userHasInteracted = false;
	const hasUserInteracted = (function () {
		return userHasInteracted;
	});

	// Intersection Observer to play pause videos as they enter / exit view
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const video = entry.target;
			const player = new Vimeo.Player(video);

			player.ready().then(function () {
				if (entry.isIntersecting) {

					// Video is in view
					player.getMuted().then(function (muted) {

						if (muted) {
							// If muted, autoplay
							player.play();
						}

						if (hasUserInteracted) {
							// autoplay with volume only if user has interacted
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

	// Var to check if top section is sticky
	let topSectionIsSticky = false;

	// Var scroll has happened after user click
	let hasScrolledOnce = false;

	const scrollToElement = (function (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	});

	// Intersection observer for when sticky section has reached top of window
	const sectionObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {

			// Sticky Section has reached top
			if (entry.isIntersecting && entry.boundingClientRect.top <= 0) {

				// Add no scroll effect to body
				document.body.classList.add('no-scroll');

				// Stop observing the element
				observer.unobserve(entry.target);

				// Flag top section as sticky
				topSectionIsSticky = true;
			}
		});
	}, { threshold: [1.0] });

	// Function to remove the stickiness on top section
	const handleUserClick = (function (event) {
		const sections = document.querySelectorAll('body:not(.elementor-editor-active) section.elementor-section');

		// Check if clicked element is Elementor button
		const isButton = Array.from(event.target.classList).some(className => className.startsWith('elementor-button'));

		if (sections.length > 0 && (topSectionIsSticky || isButton)) {
			// Remove top section stickyness
			sections[0].classList.remove('make-sticky');

			// Remove no scroll effect from body
			document.body.classList.remove('no-scroll');

			// Hide the button that is suppose to trigger click
			const button = sections[0].querySelector('.elementor-widget-button');
			if (button) button.style.opacity = '0';

			// Scroll to section after the top sticky section
			if (sections[1] && !hasScrolledOnce) {
				scrollToElement(sections[1]);

				hasScrolledOnce = true;
			}

			// Top section is not sticky anymore
			topSectionIsSticky = false;
		}

		// Set the userHasInteracted flag to true when a click event occurs
		// This is for the video autoplay functions
		userHasInteracted = true;
	});

	// Initialize top sticky section
	const initializeStickySection = (function () {
		// User applies .make-sticky class through Elementor if they want this behaviour
		const stickySection = document.querySelector('.make-sticky');

		if (stickySection) {
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
			sectionObserver.observe(stickySection);

			// Listen for a user click / tap event
			document.addEventListener('click', handleUserClick);
			document.addEventListener('touchstart', handleUserClick);
		}
	});

	initializeStickySection();
})();
