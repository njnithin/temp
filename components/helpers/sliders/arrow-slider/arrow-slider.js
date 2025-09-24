(function ($) {
  /* Simple Arrow Slider Widgets */
  $.fn.arrowSlider = function (settings) {
    let $arrowSliderArea = this;
    if ($arrowSliderArea.length === 0) {
      return;
    }
    $arrowSliderArea.wrapInner(
      '\
        <div class="arrow-slider">\
         <div class="slider-section">\
           <div class="slider-section-wrap">\
           </div>\
         </div>\
         </div>\
      '
    );
    function getDefaultSettings() {
      return ({
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        dots: false,
        loop: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendArrows: $arrowSliderArea.find('.slider-section'),
        prevArrow: '<button title="Previous" type="button" data-role="none" class="slick-prev">Previous</button>',
        nextArrow: '<button title="Next" type="button" data-role="none" class="slick-next">Next</button>',
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    }
    let defaultSettings = $.extend(getDefaultSettings(), settings);
    $arrowSliderArea.on('init', function () {
      setFirstAndLast($(this));
      $(this).closest('.slick-await').addClass('slick-created');
    });
    $arrowSliderArea
      .find('.slider-section-wrap')
      .slick(defaultSettings)
      .on('afterChange', function () {
        setFirstAndLast($(this));
      });
    $arrowSliderArea
      .closest('.arrow-slider');
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
  }
}(jQuery));
