(function ($) {
  var $tabClicked = false;
  function listingTabSettings() {
    /* tab click */
    $(document).on('click', '.custom-tabs .each-tab', function (e) {
      e.preventDefault();
      let $clicked = $(this),
        $clickedValue = $clicked.attr('value');
      if (!$clicked.hasClass('active')) {
        $tabClicked = true;
        /* active */
        $clicked
          .addClass('active')
          .parent()
          .addClass('active')
          .siblings()
          .removeClass('active')
          .find('.each-tab')
          .removeClass('active');
        // scroll to tab
        scrollToTab($(".custom-tabs"), $clicked);
        // show tab content based on click
        $targetSec = $('.custom-tabs-sec[value="' + $clickedValue + '"]');
        $targetSec
          .addClass('active')
          .siblings()
          .removeClass('active');
        scrollToResults($targetSec)
      }
    });
  }
  /*** Scroll to tab. ***/
  function scrollToTab($scrollArea, $clicked) {
    let scrollItem = $clicked.parent(),
      scrollItemLeft = scrollItem[0].offsetLeft - 5;
    $scrollArea.animate({
      scrollLeft: scrollItemLeft
    }, 500);
  }
  /*** END OF Scroll to tab. ***/
  function scrollToResults($targetSec) {
    if ($tabClicked) {
      var $negativeOffset = ($('.site-header').outerHeight() + $('.custom-tabs-wrap').outerHeight() + 30) * -1;
      scrollToSection($targetSec, $negativeOffset, 300);
      $tabClicked = false;
    }
  }
  function switchTabFromURL() {
    var $tabID = window.location.hash,
      $element = $($tabID);
    // console.log($tabID)
    setTimeout(function () {
      if ($element.hasClass('each-tab')) {
        $element
          .removeClass('active')
          .trigger('click');
      }
      else {
        scrollToResults($element);
        // var $activeTab = $('.each-tab.active'),
        // $activeTabID = $activeTab.attr('id'),
        var $pathName = window.location.pathname,
          $url = $pathName + $tabID;
        $.activateSubLink($url, false, true, true, false);
        // console.log('no tab id', $url);
      }
    }, 700);

  }
  $(document).ready(function () {
    listingTabSettings();
    switchTabFromURL();
  });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $(document).ajaxComplete(function () { });
  // $(window).on('resize', function () {});
}(jQuery));
