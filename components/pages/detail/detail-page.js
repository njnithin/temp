(function ($) {
  function activateMenu() {
    // var $urlParams = new URLSearchParams(window.location.search);
    // console.log($urlParams.get('destination'))
    var $currentUrl = window.location.pathname + window.location.search + window.location.hash;
    $.activateSubLink(
      $currentUrl,
      false,
      true,
      true,
      true
    )
  }
  function gallerySliderCall() {
    $('.gallery-sec').each(function () {
      $(this).gallerySlider();
    });
  }
  $(document).ready(function () {
    activateMenu();
    gallerySliderCall();
  });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
