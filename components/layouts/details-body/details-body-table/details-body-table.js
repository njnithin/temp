(function ($) {
  function repsonsiveTable() {
    $('table').each(function () {
      var $table = $(this);
      if (
        !$table.parent().hasClass('table-responsive') &&
        $table.closest('.table-area').length === 0 // to exclude overriding of style in projects table
      ) {
        $table
          .addClass('loaded')
          .wrap('<div class="table-wrap table-responsive ck-editor-table details-body-table-js"></div>');
      }
    });
  }
  // $(document).ready(function () {});
  $(window).on('load', function () {
    repsonsiveTable();
  });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
