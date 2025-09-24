(function ($) {
  var $firstLoad = true,
    $gallery,
    $popup;
  function sliderSettings() {
    updateSlider();
    /*** Grid Image Click. ***/
    $(document).on('click', 'body:not(.nj-popup-shown) .listing-view.loaded .gallery-item-img img', function (e) {
      e.preventDefault();
      var $clicked = $(this),
        $itemIndex = $clicked.closest('.views-row').index();
      $gallery.showSliderWithIndex($itemIndex);
      setTimeout(function () {
        $popup.show();
      }, 100);
    });
    /*** END OF Grid Image Click. ***/
    $(document).on('click', '.nj-popup-content .nj-popup-close', function (e) {
      e.preventDefault();
      $popup.hide();
    });
    $('.listing-view').addClass('loaded');
  }
  function updateSlider() {
    $popup.updateContent(
      '<a href="#" class="nj-popup-close">X</a>\
       <div class="gallery-sec gallery-page">\
        <div class="gallery-preview-sec">\
          <div class="gallery-slider-items">\
          </div>\
        </div>\
        <div class="gallery-thumb-sec">\
          <div class="gallery-slider-items">\
          </div>\
        </div>\
      </div>\
     '
    );
    var $sliderItems = $('.listing-view .gallery-slider-item:not(.video-item-wrap)').clone();
    $popup
      .element
      .find('.gallery-slider-items')
      .append($sliderItems);
    setTimeout(function () {
      $gallery = $popup
        .element
        .find('.gallery-sec')
        .gallerySlider();
    }, 500);
  }
  $(document).ready(function () {
    $popup = $('body').njPopupInit({ clearContent: false });
    sliderSettings();
  });
  $(window).on('load', function () {
    $firstLoad = false;
  });
  $(document).ajaxComplete(function () {
    if ($firstLoad === false) {
      updateSlider();
    }
  })
  // $(window).on('scroll', function () {});
  // $(window).on('resize', function () {});
}(jQuery));
