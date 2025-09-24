(function ($) {
  var $tabClicked = false,
    $firstTabClick = true;
  function listingTab() {
    let $tabView = $('.tab-using-js');
    if ($tabView.length) {
      let $selectWithTab = $tabView.find('.select-tabs');
      /* create tabs */
      createTabs();
      /* tab click */
      $(document).on('click', '.custom-tabs .each-tab', function (e) {
        e.preventDefault();
        let $clicked = $(this),
          $clickedValue = $clicked.attr('value');
        if (!$clicked.hasClass('active')) {
          $tabClicked = true;
          if (window.location.hash != '') {
            window.location.hash = $clicked.attr('id');
            /* Remove year on tab change */
            if (!$firstTabClick) {
              const url = new URL(window.location.href);
              if (url.searchParams.has('year')) {
                url.searchParams.delete('year');
                history.replaceState(null, '', url.toString());
              }
            }
          }
          /* active */
          $clicked
            .addClass('active')
            .parent()
            .addClass('active')
            .siblings()
            .removeClass('active')
            .find('.each-tab')
            .removeClass('active');
          // scroll to tab
          scrollToTab($(".custom-tabs"), $clicked);
          // console.log($clickedValue)
          $('.select-tabs')
            .val($clickedValue)
            .trigger('change');
          resetFilterSearch();
          $('.tab-using-js .view-filters')
            .find('[value="Apply"]')
            .trigger('click');
        }
        $firstTabClick = false;
      });
      /*** Scroll to tab. ***/
      function scrollToTab($scrollArea, $clicked) {
        let scrollItem = $clicked.parent(),
          scrollItemLeft = scrollItem[0].offsetLeft - 5;
        $scrollArea.animate({
          scrollLeft: scrollItemLeft
        }, 500);
      }
      /*** END OF Scroll to tab. ***/
      /*** Create tabs. ***/
      function createTabs() {
        let $tabStruct = "<div class='custom-tabs-wrap'><div class='custom-tabs'>",
          $selectedValue = $selectWithTab.find('option:selected').val();
        $selectWithTab
          .find('option')
          .each(function () {
            let $option = $(this),
              $value = $option.val(),
              $isActive = $selectedValue === $value ? 'active' : '',
              $tabText = $option.text(),
              $tabID = $tabText.trim().toLowerCase().replace(/ /g, '-');
            if ($value != 'All') {
              // console.log($option);
              $tabStruct += '\
              <div class="each-tab-item ' + $isActive + ' ">\
                <a class="each-tab ' + $isActive + '" value = "' + $value + '" href = "#" id="' + $tabID + '" >\
                ' + $tabText + '\
                </a >\
              </div > ';
            }
          });
        $tabStruct += "</div></div>";
        $tabView.before($tabStruct);
      }
      function resetFilterSearch() {
        // console.log('on reset ')
        /* Reset all the select */
        $('.listing-view select:not(.select-tabs)')
          .each(function () {
            var $currentSelect = $(this),
              $defaultOptionValue = $(this).find('option:first-child').val();
            $currentSelect.val($defaultOptionValue);
          });
        $('.listing-search').val('');
        /* Reset year menu  */
        var $pathName = window.location.pathname,
          $nonActiveTabs = $('.each-tab:not(.active)');
        $nonActiveTabs
          .each(function () {
            $.resetDirectSubLinks($pathName, $(this).attr('id'));
          })
      }
      /*** END OF Create tabs. ***/
    }
  }
  /* Only for /resources page (title filter at ministerial meetings ) */
  /* https://projects.panapps.co/issues/361278 */
  function isMinisterialTab($tab) {
    if ($('.resource-listing').length) {
      var $listingView = $('.listing-view'),
        // $classes = 'with-two-filter ministerial-tab-active listing-tab-js';
        $classes = 'ministerial-tab-active listing-tab-js';
      if ($tab.attr('id') === 'ministerial-meetings') {
        $listingView
          .addClass($classes);
        // setTimeout(function () {
        //   $listingView.addClass('show');
        // }, 200);
      } else {
        $listingView
          .removeClass($classes);
        // setTimeout(function () {
        //   $listingView.removeClass('show');
        // }, 300);
      }
    }
  }
  /* End of Only for /resources page */
  function scrollToResults() {
    if ($tabClicked) {
      var $negativeOffset = ($('.site-header').outerHeight() + $('.custom-tabs-wrap').outerHeight() + 30) * -1;
      scrollToSection('.listing-view', $negativeOffset, 300);
      $tabClicked = false;
    }
  }
  function switchTabFromURL() {
    var $tabID = window.location.hash,
      $tabElement = $($tabID);
    const $urlParams = new URLSearchParams(window.location.search),
      $year = $urlParams.get('year');
    // console.log($tabID)
    setTimeout(function () {
      if ($tabElement.hasClass('each-tab')) {
        $tabElement
          .removeClass('active')
          .trigger('click');
        if ($year != null) {
          // setTimeout(function () {
          // console.log($year)
          var $intervals = [];
          $intervals.push(setInterval(checkSelectPresent, 500));
          function checkSelectPresent() {
            var $yearSelect = $('.listing-view .year-filter select');
            if ($yearSelect.length) {
              // console.log('found year select');
              changeYearSelect($yearSelect);
              $intervals.forEach(function ($interval) {
                clearInterval($interval);
              });
              $intervals = [];
            }
            // else {
            //   console.log('finding year select...');
            // }
          }
          function changeYearSelect($yearSelect) {
            $yearSelect
              .val($year)
              .trigger('change');
            /* Custom Year Select in Resources page */
            if ($('.resource-listing').length) {
              var $intervals = [];
              $intervals.push(setInterval(customYearSelect, 500));
            }
            function customYearSelect() {
              let $customYear = $('.custom-filter-select .level-1 > .filter-li > a[value="' + $year + '"]');
              // console.log('checking ...')
              if ($customYear.length) {
                $customYear.closest('.select-li').find('>a').text($year);
                $intervals.forEach(function ($interval) {
                  clearInterval($interval);
                });
                $intervals = [];
              }
            }
            /* End of Custom Year Select in Resources page */
            var $hrefInHeader = window.location.pathname + '?year=' + $year + '#' + $('.each-tab.active').attr('id');
            // $.activateSubLink($('.site-header a[href*="' + $hrefInHeader + '"]'), true, false, false);
            $.activateSubLink($hrefInHeader, false, true, true);
          }
          // }, 1000);
        }
      }
      else {
        // console.log('no tab id');
        var $activeTab = $('.each-tab.active'),
          $activeTabID = $activeTab.attr('id'),
          $pathName = window.location.pathname,
          $url = $pathName + '#' + $activeTabID;
        $.activateSubLink($url, false, true, false, false);
        // console.log('no tab id', $activeTab, $activeTabID);
      }
      // setHashIfEmpty();
    }, 700);
  }
  function setHashIfEmpty() {
    /* find active tab */
    if (window.location.hash === '') {
      let $activeTab = $('.custom-tabs .each-tab.active');
      window.location.hash = $activeTab.attr('id');
    }
  }
  $(document).ready(function () {
    listingTab();
    switchTabFromURL();
    isMinisterialTab($('.each-tab.active'));
  });
  // $(window).on('scroll', function () {});
  $(document).ajaxComplete(function () {
    setTimeout(function () {
      isMinisterialTab($('.each-tab.active'));
      scrollToResults();
    }, 300);
  });
  // $(window).on('resize', function () {});
}(jQuery));
