(function ($) {
  var loader;
  loader = $("body").siteLoader();
  function filterSettings() {
    $('.listing-view select:not(.select-tabs)')
      .select2(
        {
          minimumResultsForSearch: -1,
          dropdownPosition: 'below' // code on select2-force-below.min.js
        }
      );
    $('.listing-view').addClass('loaded');
  }
  function filterEvents() {
    /*** END OF Title filter on Ministerial meetings. ***/
    /* Apply filter on select change --> added since there is no apply and reset button */
    $(document).on('change', '.listing-view select', function (e) {
      // var $currentOption = $(this).find('option:selected');
      setTimeout(function () {
        triggerApply();
      }, 300);
    });
    /* Search icon click */
    $(document).on('click', '.listing-search-wrap .search-icon', function (e) {
      e.preventDefault();
      triggerApply();
    });
    function triggerApply() {
      $('.custom-tabs-sec.active .view-filters')
        .find('[value="Apply"]')
        .trigger('click');
    }
  }
  $(document).ready(function () {
    filterSettings();
    filterEvents();
  });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
  $(document).ajaxStart(function () {
    loader.showLoader();
  });
  $(document).ajaxComplete(function () {
    filterSettings();
    setTimeout(function () {
      loader.hideLoader();
    }, 300);
  })
}(jQuery));
