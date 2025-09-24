(function ($) {
  function fraudTicker() {
    let $popup = $('body')
      .njPopupInit(
        {
          class: 'fraud-ticker-popup',
          clearContent: false
        }
      );
    $popup
      .updateContent(
        $('.fraud-ticker-content').html()
      );
    if ($('.fraud-ticker-view .view-content').length) {
      $popup.show();
    }
  }
  // $(document).ready(function () {});
  $(window).on('load', function () {
    fraudTicker();
  });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
