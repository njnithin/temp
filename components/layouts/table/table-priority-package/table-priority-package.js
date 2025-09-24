(function ($) {
  function tableGeneralSettings() {
    $('.table-area .table-striped')
      .removeClass('table-striped');
    tableCaptionCreation();
  }
  function tableCaptionCreation() {
    $('.table-area').each(function () {
      var $tableArea = $(this);
      $tableArea
        .find('table thead').before(
          $tableArea.find('.table-ck-title')
        );
      $tableArea
        .find('.table-ck-title')
        .addClass('from-table-priority-package-js')
        .wrap('<caption></caption>')
    })
  }
  $(document).ready(function () { tableGeneralSettings(); });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
