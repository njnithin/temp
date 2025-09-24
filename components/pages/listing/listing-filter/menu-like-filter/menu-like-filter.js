(function ($) {
  var $filterData = [],
    $firstLoad = true;
  /* Client needs the resources filter like in the menu */
  function menuLikeFilterSettings() {
    loadDataFromHeader();
  }
  function loadDataFromHeader() {
    var $interval = setInterval(checkDataFound, 500);
    function checkDataFound() {
      if ($('.site-header').hasClass('submenu-appended')) {
        $filterData = $.resourceMenuData();
        filterSettings();
        clearInterval($interval);
        // console.log('found resouce menu data');
        return true;
      }
      // console.log('searching for resource menu data');
    }
  }
  function filterSettings() {
    updateTabFilter($filterData);
    menuLikeFilterEvents();
    $firstLoad = false;
  }
  function updateTabFilter($filterData) {
    var $activeTabID = $('.each-tab.active').attr('id'),
      $tabFilterData = $filterData.filter(item => item.tabId === $activeTabID);
    /*   $filterData.filter((item) => {
        console.log(item.tabId, $activeTabID);
      }); */
    if ($tabFilterData.length) {
      $tabFilterData = $tabFilterData[0]["sub_menu"];
    }
    // console.log($tabFilterData);
    addFilterStructure(
      createFilterStructure($tabFilterData)
    );
  }
  function createFilterStructure($filterData) {
    try {
      console.log($filterData);
      var $baseLevel = 1,
        $selected = $('.listing-view .year-filter select option:selected'),
        $yearFilerLabel = $selected.text().trim(),
        $defaultLabel = $('.listing-view .year-filter select option:first-child').text(),
        $defaultValue = $('.listing-view .year-filter select option:first-child').attr('value');
      $customFormItem = $('.custom-filter-item');
      if (!$filterData || $filterData.length === 0) {
        $customFormItem.addClass('empty');
      } else {
        $customFormItem.removeClass('empty');
      }

      $struct = '<ul class="custom-filter-select">';
      $struct += '<li class="select-li"><a title="SELECT" href="#" class="select-link">' + $yearFilerLabel + '</a>';
      $struct += '<ul class="filter-sub level-' + $baseLevel + '">'
      // console.log($yearFilerLabel)
      // default value when filter is applied
      if ($filterData != undefined) {
        if (
          $filterData.length &&
          $defaultValue != $selected.attr('value')
        ) {
          $struct += '<li type="year" class="filter-li"><a value="year" href="#">' + $defaultLabel + '</a></li>';
        }
        $filterData.forEach(function ($filterItem) {
          var $hasSubClass = $filterItem.hasSub === true ? 'has-sub' : 'no-sub';
          var $filterType = $filterItem.filter_type;
          $struct += '<li type="' + $filterType + '" class="filter-li ' + $hasSubClass + '">';
          $struct += '<a  value="' + $filterItem.value + '" href="' + $filterItem.link + '">' + $filterItem.filter_text + '</a>';
          travelSubs($filterItem, $baseLevel);
          $struct += '</li>';
        });
        $struct += '</li></ul>';
      }
      $struct += '</ul>';
      function travelSubs(menuItem, level) {
        if (menuItem.hasSub === true) {
          level++;
          $struct += '<ul class="filter-sub level-' + level + '">';
          // console.log(level)
          if (level > 0) {
            var $parentLink = menuItem.link.trim(),
              $parentText = menuItem.text;
            var $noLinkClass = ($parentLink === '#' || $parentLink === '/') ? 'no-link' : 'has-link'
            $struct += '<li type="' + menuItem.filter_type + '" class="filter-li filter-parent-link ' + $noLinkClass + '"><a value="' + menuItem.value + '" href="' + $parentLink + '">' + $parentText + '</a></li>';

          }
          // $struct += '<li class="test-li"><ul class="test-ul">';
          // console.log(menuItem)
          menuItem.sub_menu.forEach(function (subItem) {
            var $hasSubClass = subItem.hasSub === true ? 'has-sub' : 'no-sub';
            var $filterType = subItem.filter_type;
            $struct += '<li type="' + $filterType + '" class="filter-li ' + $hasSubClass + '"><a  href="' + subItem.link + '">' + subItem.filter_text + '</a>';
            travelSubs(subItem, level);
            $struct += '</li>';
          });
          // $struct += '</ul></li>';
          $struct += '</ul>';
        } else {
          return;
        }
      }
      return $struct;
    } catch (err) {
      console.log('Error building filter structure:', err);
      $('.custom-filter-item').addClass('empty');
      return ''; // Return empty string so it doesn't break other code
    }
  }
  function addFilterStructure($filterStruct) {
    // console.log($filterStruct)
    var $filterItem = $('.listing-view .form--inline .custom-filter-item');
    $filterItem.find('.custom-filter-select')
      .remove();
    $filterItem
      .append($filterStruct);
  }
  function menuLikeFilterEvents() {
    function closeCustomFilter() {
      $('.custom-filter-select .select-li.show').removeClass('show');
    }
    /*** Open and Close event for custom select filter. ***/
    $(document).on('click', '.custom-filter-select .select-link', function (e) {
      e.preventDefault();
      $(this).closest('li').toggleClass('show');
    });
    $(document).mouseup(function (e) {
      var container = $('.custom-filter-select .select-li,.custom-filter-select .filter-sub');
      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        closeCustomFilter();
      }
    });
    /*** END OF Open and Close event for custom select filter. ***/
    /*** Sub links click. ***/
    $(document).on('click',
      '.custom-filter-select .filter-li > a',
      function (e) {
        e.preventDefault();
        var $clicked = $(this),
          $isSubLink = $clicked.parent().hasClass('has-sub'),
          $isTouchDevice = window.matchMedia("(pointer: coarse)").matches,
          $value = $clicked.attr('value'),
          $type = $clicked.parent().attr('type');
        if ($type === 'year') {
          // console.log($type, $isTouchDevice, $isSubLink)
          if (
            !($isTouchDevice === true && $isSubLink === true) ||
            $(window).width() < 540 // only year filter(first level is showing in mobile)
          ) {
            $('.listing-view .year-filter select').val($value).trigger('change');
            closeCustomFilter();
          }
        } else if ($type === 'content') {
          window.location = $clicked.attr('href');
          closeCustomFilter();
        }
      });
    /*** END OF Sub links click. ***/
  }
  $(document).ready(function () {
    menuLikeFilterSettings();
  });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  $(document).ajaxComplete(function () {
    if (
      $('.listing-view .custom-filter-item .custom-filter-select').length === 0 &&
      $firstLoad === false
    ) {
      updateTabFilter($filterData);
    }
  });
  // $(window).on('resize', function () {});
}(jQuery));
