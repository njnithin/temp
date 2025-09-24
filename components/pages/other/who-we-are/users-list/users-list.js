(function ($) {
  function usersListLoadmore() {
    $('.users-list-sec').each(function () {
      $(this).loadMoreLess(9, false);
    })
  }
  // $(document).ready(function () { usersListLoadmore(); });
  $(window).on('load', function () { usersListLoadmore(); });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
