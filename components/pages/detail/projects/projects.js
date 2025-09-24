(function ($) {
  function scrollToID() {
    var $secID = window.location.hash;
    if ($secID != ' ') {
      setTimeout(function () {
        var headerHeight = $('.site-header').outerHeight();
        if ($('.custom-tabs-wrap').length) {
          headerHeight += $('.custom-tabs-wrap').outerHeight();
        }
        if ($('.user-logged-in.toolbar-fixed').length) {
          headerHeight += 78;
        }
        if ($($secID).closest('.each-tab-item').length === 0) {
          scrollToSection($secID, -headerHeight, 0); // function from global.js
        }
      }, 1200);
    }
  }
  $(document).ready(function () { scrollToID(); });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
