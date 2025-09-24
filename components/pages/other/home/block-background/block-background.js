(function ($) {
  function setBlockBackground() {
    let $blockBackgrounds = $('.block-bg-img');
    $blockBackgrounds.each(function () {
      let $bgCurrent = $(this),
        $bgImg = $bgCurrent.find('img'),
        // $bgImgHeight = $bgImg[0].naturalHeight,
        $bgImgSrc = $bgImg.attr('src');
      $bgCurrent
        .closest('.block')
        .addClass('block-img-added')
        .css(
          {
            "background-image": "url(" + $bgImgSrc + ")",
            "background-repeat": "no-repeat",
            "background-size": "cover"
          });

    });
  }
  $(document).ready(function () {
    setTimeout(function () {
      setBlockBackground();
    }, 1500);
  });
  // $(window).on('load', function () { });
  // $(window).on('scroll', function () { });
  // $( document ).ajaxComplete(function() { })
  // $(window).on('resize', function () { });
}(jQuery));
