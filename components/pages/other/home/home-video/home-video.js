(function ($) {
  function homeVideoSettings() {
    $('.home-video').each(function () {
      addIframe($(this));
    })
  }
  function addIframe($videoFrame) {
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
  // $(document).ready(function () { });
  $(window).on('load', function () {
    homeVideoSettings();
  });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
