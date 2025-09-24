(function ($) {
  function scrollUpArrowSettings() {
    var $target;
    if ($('.detail-page').length) {
      $target = $('.detail-view');
    }
    else if ($('.projects-page').length) {
      $target = $('.custom-tabs-content');
    }
    /*** Scroll up arrow Settings. ***/
    $('body')
      .append(
        '\
          <div class="scroll-up-arrow-wrap">\
            <a title="Back to top" class="scroll-up-arrow" href="#">Up Arrow</a>\
          </div>\
        '
      );
    /*** END OF Scroll up arrow Settings. ***/
    showHideScrollUp();
    /*** Scroll up arrow click. ***/
    $(document).on('click', '.scroll-up-arrow', function (e) {
      e.preventDefault();
      var $minusValue = -100;
      if ($('.projects-page').length) {
        $minusValue -= $('.custom-tabs-wrap').outerHeight();
      }
      scrollToSection($target, $minusValue, 0);
    });
    /*** END OF Scroll up arrow click. ***/
  }
  function showHideScrollUp() {
    let $target,
      $scrollTop = $(window).scrollTop(),
      $scrollUpArrow = $('.scroll-up-arrow-wrap'),
      $bannerHeight = $('.banner').length ? $('.banner').outerHeight() : 0,
      $scrollUpArrowTop = $('.scroll-up-arrow-wrap').length ? $('.scroll-up-arrow-wrap').offset().top : 0,
      $siteFooterTop = $('.site-footer').length ? $('.site-footer').offset().top : 0;
    if ($('.detail-page').length) {
      $target = $('.detail-view');
    }
    else if ($('.projects-page').length) {
      $target = $('.custom-tabs-content');
    }
    if (
      ($target.outerHeight() > 700) &&
      ($scrollTop > ($bannerHeight + 100)) &&
      // true
      ($scrollUpArrowTop + 100 < $siteFooterTop)
    ) {
      $scrollUpArrow.addClass('shown');
      // console.log('show')
      // console.log($target.outerHeight());
    } else {
      $scrollUpArrow.removeClass('shown');
      // console.log('hide')
    }
  }
  $(document).ready(function () { scrollUpArrowSettings(); });
  // $(window).on('load', function () {});
  $(window).on('scroll', function () { showHideScrollUp() });
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
