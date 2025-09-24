(function ($) {
  var $firstLoad = true,
    $gallery,
    $videoPopup;
  function videoSettings() {
    updateSlider();
    /*** Video Item Click. ***/
    $(document).on('click', 'body:not(.nj-popup-shown) .listing-view .video-item a', function (e) {
      e.preventDefault();
      var $clicked = $(this),
        $itemIndex = $clicked.closest('.views-row').index();
      $gallery.showSliderWithIndex($itemIndex);
      refreshIframe($itemIndex);
      setTimeout(function () {
        $videoPopup.show();
      }, 100);
      // console.log('video clicked')
    });
    $(document).on('click', '.gallery-thumb-sec .video-play-link', function (e) {
      e.preventDefault();
    });
    /*** END OF Video Item Click. ***/
    $(document).on('click', '.video-popup .nj-popup-content .nj-popup-close', function (e) {
      e.preventDefault();
      $videoPopup.hide();
      $videoPopup.content.find('iframe').remove();
    });
  }
  function refreshIframe(activeIndex) {
    var $videoFrame = $gallery.previewSection.find('[data-slick-index="' + activeIndex + '"]'),
      $iframeLink = $videoFrame.attr('link'),
      $ytParams = '';
    // $ytParams = 'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen';
    if ($videoFrame.find('iframe').length === 0) {
      $videoFrame
        .append(
          '\
          <iframe data-autoplay="true" src="' + $iframeLink + '" ' + $ytParams + '>\
          </iframe>\
          '
        )
        .siblings()
        .html('');
    }
  }
  function updateSlider() {
    $videoPopup.updateContent(
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
    var $sliderItems = $('.listing-view .gallery-slider-item.video-item-wrap').clone(),
      $iframStructure = '';
    $sliderItems.each(function (index) {
      var $item = $(this),
        $link = $item.find('.video-play-link'),
        $iframeLink = $link.attr('href');
      // $link.after('<span class="video-play-link"></span>');
      // $link.remove('');
      $iframStructure += '<div class="video-frame" link="' + $iframeLink + '">';
      // $iframStructure += '<iframe src="' + $iframeLink + '"></iframe>';
      $iframStructure += '</div>';
    })
    // console.log($iframStructure)
    $videoPopup
      .element
      .find('.gallery-preview-sec .gallery-slider-items')
      .append($iframStructure);
    // thumbnail section
    $videoPopup
      .element
      .find('.gallery-thumb-sec .gallery-slider-items')
      .append($sliderItems);
    setTimeout(function () {
      $gallery = $videoPopup
        .element
        .find('.gallery-sec')
        .gallerySlider({
          beforePreviewUpdate: function (nextSlide) {
            refreshIframe(nextSlide);
          }
        });
    }, 500);
  }

  $(document).ready(function () {
    $videoPopup = $('body').njPopupInit({ class: 'video-popup', clearContent: false });
    videoSettings();
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
