(function ($) {
  /* for converting table under pillar section to box style in design */
  function pillarBoxFromTable() {
    var $tables = $('.pillar-table-wrap table');
    $tables.each(function () {
      var $currentTable = $(this),
        $rows = $currentTable.find('tbody > tr'),
        $boxStructure = "<div class='pillar-boxes'>";
      $rows.each(function () {
        $boxStructure += '<div class="pillar-box">';
        var $currentRow = $(this),
          $columns = $currentRow.find('td');
        $columns.each(function () {
          var $currentColumn = $(this),
            $currentColumnVal = $currentColumn.text(),
            $columnIndex = $currentColumn.index();
          if ($columnIndex == 3) {
            $boxStructure += '<div class="pillar-box-values">';
          }
          if ($currentColumnVal != '') {
            var $columnHeadText = $currentTable.find('th').eq($columnIndex).text().trim();
            $boxStructure +=
              '\
                <div class="pillar-box-item ' + $columnHeadText.replace(/\s+/g, '-').toLowerCase() + '">\
                  ' + $currentColumnVal + '\
                </div>\
                ';
          }
          if ($columnIndex + 1 === $columns.length) {
            $boxStructure += '</div>';
          }
        });
        $boxStructure += "</div>";
      });
      $boxStructure += "</div>";
      $currentTable
        .closest('.pillar-table-wrap')
        .before($boxStructure)
        .remove();
      $('.pillar-boxes').each(function () {
        $pillarBoxesWrap = $(this);
        $pillarBoxesWrap
          .find('.pillar-box')
          .each(function () {
            var $box = $(this),
              $pillarBoxItemLength = $box.find('.pillar-box-item').length,
              $pillarBoxValues = $box.find('.pillar-box-values'),
              $pillarBoxValuesEmpty = $pillarBoxValues.find('.pillar-box-item').length === 0;
            if ($pillarBoxItemLength == 0) {
              $box.remove()
            }
            if ($pillarBoxValuesEmpty) {
              $pillarBoxValues.remove();
            }
          });
        if ($pillarBoxesWrap.find('.pillar-box').length === 0) {
          $pillarBoxesWrap.remove();
        }
      });
    })
  }
  $(document).ready(function () { pillarBoxFromTable(); });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
