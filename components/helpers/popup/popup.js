(function ($) {
  /* Site popup widget  */
  $.fn.njPopupInit = function (options) {
    /* Show popup */
    wbsShowPopup = function () {
      $popup.addClass('nj-popup-show');
      setTimeout(function () {
        $('body').addClass('nj-popup-shown');
      }, 100);
    }
    /* Hide popup */
    wbHidePopup = function () {
      // console.log('popup-hide');
      $popup.removeClass('nj-popup-show');
      $('body').removeClass('nj-popup-shown');
      setTimeout(function () {
        if (settings.clearContent) {
          $popupContent.html("");
        }
        if (settings.clearFooter) {
          $popupContent.html("");
        }
        if (settings.clearHeader) {
          $popupContent.html("");
        }
        settings.closedEvent();
      }, 1200);
    }
    wbclosedEvent = function () {
      // console.log("closed");
    }
    /* Hide popup */
    wbupdateContent = function ($content) {
      $popupContent
        .html("")
        .html($content);
    }
    // This is the easiest way to have default options.
    var settings = $.extend({
      class: '',
      clearHeader: false,
      clearContent: true,
      clearFooter: false,
      closedEvent: wbclosedEvent
    }, options);
    let $popupLocation = this,
      $ID = "nj-popup-" + Math.floor(Math.random() * 100000),
      $class = settings.class,
      $popup;
    if ($popupLocation.length === 0) {
      return;
    }
    $popupLocation
      .prepend(
        '<div id="' + $ID + '" class="nj-popup ' + $class + '">\
          <div class="nj-popup-box">\
            <div class="nj-popup-icons">\
               <a href="#" class="nj-popup-close">X</a>\
            </div>\
            <div class="nj-popup-header"></div>\
            <div class="nj-popup-content"></div>\
            <div class="nj-popup-footer"></div>\
          </div>\
        </div>'
      );
    $popup = $("#" + $ID);
    var $popupHeader = $popup.find('.nj-popup-header'),
      $popupContent = $popup.find('.nj-popup-content'),
      $popupFooter = $popup.find('.nj-popup-footer');
    /* Events */
    $popup
      .find('.nj-popup-close')
      .on('click', function (e) {
        e.preventDefault();
        wbHidePopup();
      });
    /*     $(document).click(function (e) {
          let $container = $('.nj-popup-box');
          if (!$container.is(e.target) && $container.has(e.target).length === 0) {
            wbHidePopup();
          }
        }); */
    /* End of Events */
    return ({
      class: $class,
      element: $popup,
      icons: $popup.find('.nj-popup-icons'),
      header: $popupHeader,
      content: $popupContent,
      footer: $popupFooter,
      id: $ID,
      show: wbsShowPopup,
      hide: wbHidePopup,
      updateContent: wbupdateContent
    });
  }
}(jQuery));
