(function ($) {
  /* Simple Arrow Slider Widgets */
  $.fn.bannerSlider = function (settings) {
    let $bannerSliderArea = this,
      totalItems = $bannerSliderArea.find('>*').length;
    if ($bannerSliderArea.length === 0 || totalItems === 0) {
      return;
    }
    $bannerSliderArea.wrapInner(
      '\
        <div class="banner-slider">\
         <div class="slider-section">\
           <div class="slider-section-wrap">\
           </div>\
         </div>\
         </div>\
      '
    );
    function getDefaultSettings() {
      return ({
        sliderInit: function () { },//custom function not inbuild in slick
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: true,
        pauseOnFocus: true,
        speed: 200,
        dots: totalItems > 1,
        // dots: true,
        loop: true,
        infinite: true,
        arrows: true,
        appendArrows: $bannerSliderArea.find('.slider-section'),
        prevArrow: '<button title="Previous" type="button" data-role="none" class="slick-prev">Previous</button>',
        nextArrow: '<button title="Next" type="button" data-role="none" class="slick-next">Next</button>',
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true
            }
          }
        ]
      });
    }
    let defaultSettings = $.extend(getDefaultSettings(), settings), $slickObj;
    $bannerSliderArea.on('init', function () {
      let $sliderObj = $(this);
      setFirstAndLast($(this));
      zoomEffect(
        $sliderObj.find('.slick-slide.slick-active'),
        1000
      );
      defaultSettings.sliderInit($sliderObj);
      $(this).closest('.slick-await').addClass('slick-created');
    });
    $slickObj = $bannerSliderArea
      .find('.slider-section-wrap')
      .slick(defaultSettings);
    $slickObj
      .on('afterChange', function () {
        let $sliderObj = $(this);
        setFirstAndLast($sliderObj);
        $sliderObj.find('.slick-slide').removeClass('zoom');
        zoomEffect(
          $sliderObj.find('.slick-slide.slick-active'),
          300
        );
      });
    function zoomEffect(activeSlide, delay) {
      setTimeout(function () {
        activeSlide.addClass('zoom');
      }, delay);
    }
    /* function for update the first and last child of active item */
    function setFirstAndLast(slickObj) {
      let activeItems = slickObj
        .find('.slick-active')
        .removeClass('first-item-active last-item-active');
      if (activeItems.length > 1) {
        activeItems.first().addClass('first-item-active');
        activeItems.last().addClass('last-item-active');
      }
    }
    return $slickObj;
  }
}(jQuery));
