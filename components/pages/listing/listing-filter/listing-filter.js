(function ($, Drupal) {
  var loader,
    $firstLoad = true;
  loader = $("body").siteLoader();
  function filterSettings() {
    $('.listing-view select:not(.select-tabs)')
      .select2(
        {
          minimumResultsForSearch: -1,
          dropdownPosition: 'below' // code on select2-force-below.min.js
        }
      ).on('select2:select', function (e) {
        $(this).trigger('change'); // Force native change
      });
    $('.listing-view').addClass('loaded');
  }
  function filterEvents() {
    /*** END OF Title filter on Ministerial meetings. ***/
    /* Apply filter on select change --> added since there is no apply and reset button */
    // $(document).on('change', '.listing-view select', function (e) {
    $(document).on('change select2:select', '.listing-view select', function (e) {
      var $currentOption = $(this).find('option:selected');
      setTimeout(function () {
        var $value = $currentOption.attr('value');
        if (
          $currentOption.closest('.form-item').hasClass('year-filter')
        ) {
          // change in year filter: used in resources page
          // update the submenu in header based on menu change
          // console.clear();
          var $pathName = window.location.pathname,
            $hash = window.location.hash,
            $tabID = $hash != '' ? $hash : '#' + $('.each-tab.active').attr('id'),
            $hrefInHeader = $pathName + '?year=' + $value + '' + $tabID;
          // $subLinkToActivate = $('.site-header a[href*="' + $hrefInHeader + '"]');
          // console.log($hash, $value, $tabID)
          const url = new URL(window.location.href),
            $urlParams = new URLSearchParams(window.location.search),
            $year = $urlParams.get('year');
          // console.log('innnnnnnnn', $value);
          if ($currentOption.index() === 0) {
            if ($year != null) {
              url.searchParams.delete('year');
            }
            // default option year
            $.resetDirectSubLinks($pathName, $tabID);
          }
          else {
            url.searchParams.set('year', $value);
            // a year in menu should be active
            // console.log($subLinkToActivate)
            $.activateSubLink($hrefInHeader, false, true, true);
            // $.activateSubLink($subLinkToActivate, true, true, false);
          }
          url.hash = $tabID;
          history.replaceState({}, '', url.toString());
        }
        triggerApply();
      }, 300);
    });
    /* Search icon click */
    $(document).on('click', '.listing-search-wrap .search-icon', function (e) {
      e.preventDefault();
      // search($(this).closest('.form-item'));
      triggerApply();
    });
    /*  function search($formItem) {
       let $searchItem = $formItem.find('input'),
         $searchVal = $searchItem.val();
       if ($searchVal.trim() === '') {
         $formItem.addClass('show-validate-msg');
         setTimeout(function () {
           $formItem.removeClass('show-validate-msg');
         }, 1200);
       }
       else {
         triggerApply();
       }
     } */
  }
  function triggerApply() {
    $('.listing-view .view-filters')
      .find('[value="Apply"]')
      .trigger('click');
  }
  function executeURLCommands() {
    var $tabID = window.location.hash,
      $tabElement = $($tabID);
    // console.log($tabElement);
    const $urlParams = new URLSearchParams(window.location.search),
      $year = $urlParams.get('year');
    // console.log($tabID)
    // setTimeout(function () {
    if ($tabElement.hasClass('each-tab')) {
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
          $('.select-tabs').val($tabElement.attr('value'));
          $yearSelect
            .val($year)
            .trigger('change');
          setTimeout(function () {
            switchTab();
          }, 500);
          // console.log('Year is going to update...');
          // console.log('Year is updated ...')
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
          // var $hrefInHeader = window.location.pathname + '?year=' + $year + '#' + $tabElement.attr('id');
          var $pathName = window.location.pathname,
            $hash = window.location.hash,
            $tabID = $hash != '' ? $hash : '#' + $tabElement.attr('id'),
            $hrefInHeader = $pathName + '?year=' + $year + '' + $tabID;
          // $.activateSubLink($('.site-header a[href*="' + $hrefInHeader + '"]'), true, false, false);
          $.activateSubLink($hrefInHeader, false, true, true);
        }
        // }, 1000);
      } else {
        // only #tab-id present
        switchTab();
      }
    }
    else {
      switchTab();
      // console.log('no tab id');
      var $activeTab = $('.each-tab.active'),
        $activeTabID = $activeTab.attr('id'),
        $pathName = window.location.pathname,
        $url = $pathName + '#' + $activeTabID;
      $.activateSubLink($url, false, true, true, true);
      // console.log('no tab id', $activeTab, $activeTabID);
    }
    // setHashIfEmpty();
    // }, 700);
    function switchTab() {
      $tabElement = $($tabID);
      if ($tabElement.length > 0) {
        $tabElement
          .removeClass('active')
          .trigger('click');
      }
    }
  }
  function safeExecuteURLCommands() {
    let tries = 0;
    const maxTries = 20;
    const interval = setInterval(() => {
      if ($('.custom-tabs-wrap').length > 0) {
        clearInterval(interval);
        executeURLCommands();
      } else if (tries++ > maxTries) {
        clearInterval(interval);
        // console.warn('Tabs never appeared, skipping executeURLCommands');
      }
    }, 300);
  }
  $(document).ready(function () {
    // console.clear();
    filterSettings();
    filterEvents();
  });
  $(window).on('load', function () {
    safeExecuteURLCommands();
    // executeURLCommands();
    $firstLoad = false;
  });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
  $(document).ajaxStart(function () {
    loader.showLoader();
  });
  $(document).ajaxComplete(function () {
    filterSettings();
    setTimeout(function () {
      loader.hideLoader();
    }, 300);
  });
  // const originalBeforeSend = Drupal.Ajax.prototype.beforeSend;
  // Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  //   console.log($('.year-filter select').val());
  //   // Call the original beforeSend
  //   // originalBeforeSend.call(this, xmlhttprequest, options);
  // };
  // $(document).ajaxSuccess(function (event, xhr, settings) {
  //   if (settings.url.includes('/views/ajax')) {
  //     const response = JSON.parse(xhr.responseText);
  //     response.forEach((cmd) => {
  //       if (cmd.command === 'insert') {
  //         const wrapper = document.createElement('div');
  //         wrapper.innerHTML = cmd.data;
  //         console.log('View HTML Element:', wrapper);
  //       }
  //     });
  //   }
  // });
}(jQuery, Drupal));
