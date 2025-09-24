(function ($) {
  function socialShareEvents() {
    $('.hoai-share-icon-wrap a').on('click', function (e) {
      e.preventDefault();
      $(this)
        .closest('.social-share')
        .toggleClass('open');
    });
    $(document).click(function (e) {
      var container = $('.social-share');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.social-share')
          .removeClass('open');
      }
    });
  }
  // $(document).ready(function () { socialShareEvents(); });
  $(window).on('load', function () { socialShareEvents(); });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
