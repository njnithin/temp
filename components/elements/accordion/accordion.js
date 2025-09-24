(function ($) {
    /**
     * ECG Accordion
     * @date 26/05/2022
     */
    let scrollToAccordion = false;
    function accordion() {
        /* Click On Accordion Head */
        // $('.ast-accordion-title').on("click", function (e) {
        $(document).on("click", '.ast-accordion-title', function (e) {
            e.preventDefault();
            var clickedAccordion = $(this).closest('.ast-accordion-item');
            /* Toggle active class for clicked item and remove active for siblings */
            /* Slide Events */
            clickedAccordion.find('.ast-accordion-body').slideToggle(500);
            clickedAccordion.siblings().find('.ast-accordion-body').slideUp(300);
            /* End of Slide Events */
            clickedAccordion.toggleClass('active')
                .siblings()
                .removeClass('active')
            /* End of Toggle active class for clicked item and remove active for siblings  */
            /* Scroll to clicked item */
            if (clickedAccordion.hasClass('active')) {
                // console.log(clickedAccordion);
                setTimeout(function () {
                    // var headerHeight = $('.site-header').outerHeight() + 30;
                    var headerHeight = $('.site-header').outerHeight();
                    if ($('.custom-tabs-wrap').length) {
                        headerHeight += $('.custom-tabs-wrap').outerHeight();
                    }
                    if ($('.user-logged-in.toolbar-fixed').length) {
                        headerHeight += 78;
                    }
                    if (scrollToAccordion) {
                        scrollToSection(clickedAccordion, -headerHeight, 0); // function from global.js
                    }
                }, 500);
            }
            /* End of Scroll to clicked item */
        });
        /* End of Click On Accordion Head */
        /* Close Accordion on Outside Click */
        $(document).mouseup(function (e) {
            var container = $('.ast-accordion-title,.ast-accordion-body');
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.ast-accordion-item.active .ast-accordion-title').trigger('click');
            }
        });
        /* End of Close Accordion on Outside Click */
        // $('.ast-accordion-item:first-child .ast-accordion-title').trigger('click');
        setTimeout(function () {
            scrollToAccordion = true;
        }, 2000);
    }
    $(window).on("load", function () {
        // setTimeout(function () {
        accordion();
        // }, 1000)
    });
}(jQuery));
