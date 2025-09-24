/* Difficulty in adding gray bg outside the alternative sections */
(function ($) {
  function setOverflowStripWidth() {
    if ($('body').hasClass('alterate-gray-bg')) {
      $('body').css({
        '--pro-overflow-strip-width': $('body').innerWidth(),
        '--pro-overflow-strip-left': $('.common-article:first-child').offset().left
      });
    }
  }
  $(window).on('load', function () {
    setTimeout(function () {
      setOverflowStripWidth();
    }, 500);
  });
  $(window).on('resize', function () {
    setOverflowStripWidth();
  });
}(jQuery));
