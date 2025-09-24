(function ($) {
  function homeBannerSlider() {
    var $sliderObj,
      $autoplayValue = true,
      $homeBanner = $('.home-banner'),
      $sliderArea = $homeBanner.find(' > .view-content');
    if ($sliderArea.find('>div:first-child .banner-video').length) {
      $autoplayValue = false;
    }
    if ($sliderArea.find('.banner-video').length) {
      $homeBanner.addClass('video-present');
    } else {
      $homeBanner.removeClass('video-not-present');
    }
    $sliderObj = $sliderArea.bannerSlider({
      autoplay: $autoplayValue,
      sliderInit: function (slider) {
        var $activeSlider = slider.find('.slick-slide.slick-current');
        findVideoPresent(slider, $activeSlider);
        addIframe($activeSlider);
      }
    });
    $sliderObj.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var $slider = slick.$slider,
        $currentSlide = $slider.find('.slick-slide[data-slick-index="' + currentSlide + '"]'),
        $nextSlide = $slider.find('.slick-slide[data-slick-index="' + nextSlide + '"]');
      destroyIframe($currentSlide);
      var $isVideoPresent = findVideoPresent($slider, $nextSlide);
      if ($isVideoPresent) {
        $slider.slick("slickPause");
      } else {
        $slider.slick("slickPlay");
      }
      addIframe($nextSlide);
    });
    function findVideoPresent($slider, $currentSlide) {
      var $bannerSec = $slider.closest('.banner'),
        $status = false;
      if ($currentSlide.find('.banner-video').length) {
        $bannerSec.addClass('has-video');
        $status = true;
      }
      else {
        $bannerSec.removeClass('has-video');
      }
      return $status;
    }
    function addIframe($currentSlide) {
      var $videoFrame = $currentSlide.find('.banner-video');
      if ($videoFrame.length) {
        var $iframeLink = $videoFrame.attr('src'),
          // $iframeParams = 'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen';
          $iframeParams = '';
        $videoFrame
          .html('')
          .append(
            '\
            <iframe data-autoplay="true" src="' + $iframeLink + '" ' + $iframeParams + '>\
            </iframe>\
            '
          )
        setTimeout(function () {
          $videoFrame.addClass('show-video')
        }, 1000);
      }
    }
    function destroyIframe($currentSlide) {
      var $videoFrame = $currentSlide.find('.banner-video').removeClass('show-video');
      $videoFrame.find('iframe').remove();
    }
  }
  function scrollArrowClick() {
    $('.home-banner .banner-scroll-link').on('click', function (e) {
      e.preventDefault();
      scrollToSection('.fullwidth-section >div > .block:first-child', -60, 0);
    });
  }
  $(window).on('load', function () {
    // homeBannerVideoSettings();
    homeBannerSlider();
    scrollArrowClick();
  });
}(jQuery));
