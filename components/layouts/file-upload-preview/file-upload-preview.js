(function ($) {
  function loadmoreSettings() {
    $('.all-files-wrap').each(function () {
      $(this).loadMoreLess(4, false);
    });
  }
  // $(document).ready(function () { loadmoreSettings(); });
  $(window).on('load', function () { loadmoreSettings(); });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
