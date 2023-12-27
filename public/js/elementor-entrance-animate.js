(function () {
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

    // Elementor adds the .animated class right before the element is in view
    // Animation classes we want to handle
    const animateClasses = ['slideInLeft', 'slideInRight', 'zoomIn'];

    // Manage elements with Elementor animation classes
    // We remove the animation classes to be re added in the Intersection Observer
    function addElementToObserver(el) {

        if (animateClasses.some(function (className) {
            //console.log('className:', className.trim());

            // check if element has animate classes
            if (el.classList.contains(className)) {
                // save animation class for re-adding when element is in view
                el.animationClass = className;

                // remove animation class
                el.classList.remove(className);

                // add class observed to remove from mutation observation
                el.classList.add('observed');

                // hide element from view
                el.style.opacity = "0";

                // add element to intersection observer
                iObserver.observe(el);

                //stop loop
                return true;
            }

        }));
    }

    // Initialize Intersection Observer
    const iObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                // unobserve element 
                iObserver.unobserve(entry.target);

                // show element in view
                entry.target.style.opacity = "1";

                // apply animation class
                entry.target.classList.add(entry.target.animationClass);

            }
        });
    }, {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 1 // halfway on the screen 
    });

    // Initialize a MutationObserver
    const mObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                // Get mutated classes
                var currentClasses = mutation.target.className;

                // Check if the Elementor animation classes are present and add to Intersection Observer
                if (currentClasses.includes('animated') && !currentClasses.includes('swiper-slide-contents') && !currentClasses.includes('observed')) {
                    addElementToObserver(mutation.target);
                }
            }
        });
    });

    // Options for the observer (which attributes to watch)
    var config = { attributes: true, subtree: true };

    // Start observing the body for changes in attributes
    mObserver.observe(document.body, config);

})();
