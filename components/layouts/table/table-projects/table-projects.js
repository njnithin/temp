(function ($) {
  /*** Filter Related functions. ***/
  function filterSettings() {
    $('.listing-view').each(function () {
      let $view = $(this);
      $view
        .find('.form-select')
        .each(function () {
          console.log($(this));
          $(this).select2(
          ).css('border', '5px solid red');
        })
    })
  }
  /*** END OF Filter Related functions. ***/
  function tableGeneralSettings($tableArea) {
    $tableArea.find('.table-striped')
      .removeClass('table-striped');
    /* Empty column and th appearing at the end in pillars 1
    * Wrapper class not supported for table heading and column, hence views-field-nothing selecte
    */
    $tableArea
      .find('.sub-pillars-sections th.views-field-nothing, .sub-pillars-sections td.views-field-nothing')
      .remove();
  }
  function placeSubTitleBelowHeader($tableArea) {
    $tableArea
      .find('table')
      .each(function () {
        var $currentTable = $(this),
          $subHeading = $currentTable.find('>caption').addClass('vanish'),
          $subHeadingText = $subHeading.text(),
          $totalColumnLength = $currentTable.find('th').length;
        if ($subHeading.length && $currentTable.closest('.view').hasClass('sub-pillars-sections')) {
          $currentTable
            .find('tbody')
            .prepend(
              '<tr class="sub-row-title table-projects-js">\
                  <td  class="sub-row-title-td" colspan="' + $totalColumnLength + ' ">\
                    ' + $subHeadingText + '\
                  </td>\
                </tr>'
            );
        }
      });
  }
  function moveSubTotalToEnd($tableArea) {
    $tableArea
      .find('.view-footer .total-sub-total').each(function () {
        var $totalElement = $(this);
        $totalElement
          .find('tbody tr')
          .appendTo(
            $totalElement
              .closest('.view-footer')
              .siblings('.view-content')
              .find('table:last-child tbody')
          );
        $totalElement
          .closest('.view-footer')
          .addClass('vanish');
      });
  }
  function subTotalSetting($tableArea) {
    $tableArea
      .find('.view-content > .table').each(function () {
        var $currentTable = $(this),
          $subTotals = $currentTable.find('.sub-total-row');
        if ($subTotals.length) {
          $subTotals.not(':last').remove();
          // $subTotals
          //   .eq(0)
          //   .appendTo($currentTable.find('tbody'));
          // $subTotals.not(':first').remove();
        }
      });
  }
  function changeTableOnMapClick() {
    $(document).on('click', '.map-area .highcharts-point:not(.highcharts-null-point)', function (e) {
      var $clickedPoint = e.target.point,
        $clickedCountry = $clickedPoint.options.name.toLowerCase(),
        $tabSec = $(this).closest('.custom-tabs-sec'),
        $tableClone = $tabSec.find('.table-to-clone').clone();
      $tabSec
        .find('.table-to-show')
        .removeClass('loaded');
      $tableClone
        .find('.ast-accordion-body')
        .each(function (index) {
          // console.log('Pillar:' + index);
          var $accordionBody = $(this),
            $total = 0,
            $valueIndex = $accordionBody.find('.table-wrap:first-child th.views-field-field-total').index(),
            $viewContent = $accordionBody.find('>.view > .view-content'),
            $tables = $viewContent.find('table');
          $tables
            .each(function (index) {
              // console.log('Table:' + index);
              var $table = $(this),
                $subTotal = 0;
              $table
                .find('tr')
                .each(function () {
                  var $row = $(this),
                    $convertedValue = parseFloat($row.find('.views-field-field-total').text()),
                    $value = isNaN($convertedValue) ? 0 : $convertedValue,
                    $countriesList = $row.find('.countries-list');
                  if ($countriesList.length) {
                    var $countries = $countriesList.text().replace(/ /g, '').toLowerCase().split(',');
                    if ($countries.indexOf($clickedCountry.replace(/ /g, '')) >= 0) {
                      $subTotal += $value;
                    }
                    else {
                      $row.remove();
                      // $row.addClass('remove');
                    }
                  }
                });
              /* Set sub total */
              $table
                .find('.sub-total-row td')
                .eq($valueIndex)
                .text(
                  $subTotal > 0 ? $subTotal.toFixed(2) : $subTotal
                );
              $total += $subTotal;
              var $dataRow = $table.find('tbody tr:not(.sub-total-row, .sub-row-title, .total-row)'),
                $isLastTable = index === $tables.length - 1,
                $totalRow;
              if ($isLastTable) {
                $totalRow = $table.find('tr.total-row').clone().addClass('appended');
              }
              // remove the table if no data row present
              if ($dataRow.length === 0) {
                $table.closest('.table-wrap').remove();
                // console.log('empty row data');
              }
              if ($isLastTable) {
                var $lastTableWrap = $viewContent.find('.table-wrap:last-child');
                if ($lastTableWrap.find('tr.total-row').length === 0) {
                  $lastTableWrap.find('table tbody')
                    .append($totalRow);
                }
              }
            });
          /* Set Total */
          $accordionBody
            .find('.total-row td')
            .eq($valueIndex)
            .text(
              $total > 0 ? $total.toFixed(2) : $total
            );
          // add no resul found if no tables are present
          if ($viewContent.find('table').length === 0) {
            $viewContent
              .append(
                '<div class="no-result">No data found...</div>'
              )
              .closest('.accordion-item')
              .addClass('no-table-found');
          }
        });
      $tabSec
        .find('.table-to-show')
        .replaceWith(
          $tableClone
            .removeClass('table-to-clone')
            .addClass('table-to-show loaded')
        );
    });
    /* Map box all settings, revert the table to page load state */
    $(document).on('click', '.map-box-close', function (e) {
      e.preventDefault();
      var $tabSec = $('.custom-tabs-sec.active');
      $tabSec.find('.table-to-show')
        .removeClass('loaded')
        .replaceWith(
          $tabSec
            .find('.table-to-clone')
            .clone()
            .removeClass('table-to-clone')
            .addClass('table-to-show loaded')
        );
    });
  }
  /*   function findEmptyAccordion($tableArea) {
      $tableArea
        .find('.ast-accordion-item')
        .each(function () {
          var $current = $(this),
            $view = $current.find('.ast-accordion-body >.view'),
            $viewContent = $view.find('> .view-content');
          if ($viewContent.length === 0) {
            $view.append(
              '<div class="no-result">No data found...</div>'
            );
            $current.addClass('no-table-found');
          }
        });
    } */
  function tableInit($tableArea) {
    tableGeneralSettings($tableArea);
    placeSubTitleBelowHeader($tableArea);
    moveSubTotalToEnd($tableArea);
    subTotalSetting($tableArea);
    $tableArea
      .find('table')
      .wrap('<div class="table-wrap table-responsive"></div>');
    // findEmptyAccordion($tableArea);
    $tableArea.addClass('loaded');
  }
  // $(document).ready(function () {});
  $(window).on('load', function () {
    /*** Init table on load. ***/
    var $tableAreas = $('.table-area');
    $tableAreas.each(function () {
      var $tableArea = $(this);
      tableInit($tableArea);
      /* for filter the table based on map */
      if ($tableArea.hasClass('table-area-map')) {
        $tableArea.after(
          $tableArea
            .addClass('table-to-show')
            .clone()
            .addClass('table-to-clone')
            .removeClass('table-to-show loaded')
        )
      }
    })
    /*** END OF Init table on load. ***/
    changeTableOnMapClick();
    // filterSettings();
  });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
