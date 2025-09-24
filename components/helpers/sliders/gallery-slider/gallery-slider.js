(function ($) {
  /* Gallery slider plugin  */
  $.fn.gallerySlider = function (options) {
    // function template for return
    changeSliderWithIndex = function ($goToIndex) {
      $galleryPreview.slick('slickGoTo', $goToIndex);
    }
    // This is the easiest way to have default options.
    var $settings = $.extend({
      goToSlide: -1,
      beforePreviewUpdate: function () { }
    }, options);
    var $currentGallery = $(this),
      $galleryPreview = $currentGallery.find('.gallery-preview-sec .gallery-slider-items'),
      $galleryThumb = $currentGallery.find('.gallery-thumb-sec .gallery-slider-items'),
      $goToIndex = $settings.goToSlide;
    $galleryPreview
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery-thumb-sec .gallery-slider-items'
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $settings.beforePreviewUpdate(nextSlide);
      });;
    $galleryThumb
      .slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.gallery-preview-sec .gallery-slider-items',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 541,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 401,
            settings: {
              slidesToShow: 1
            }
          }
        ],
      });
    checkSlickNoSlide($galleryThumb);
    if ($goToIndex != -1) {
      changeSliderWithIndex($goToIndex);
    }
    $currentGallery.addClass('loaded');
    // tooltips for next and prev
    $('.gallery-slider-items .slick-prev').attr('title', 'Previous');
    $('.gallery-slider-items .slick-next').attr('title', 'Next');
    return ({
      gallerySection: $currentGallery,
      previewSection: $galleryPreview,
      showSliderWithIndex: changeSliderWithIndex
    });
  }
  function checkSlickNoSlide($galleryThumb) {
    var getSlick = $galleryThumb.slick('getSlick');
    if (getSlick.slideCount <= getSlick.options.slidesToShow) {
      $galleryThumb.addClass('slick-no-slide');
    }
    else {
      $galleryThumb.removeClass('slick-no-slide');
    }
  }
}(jQuery));
