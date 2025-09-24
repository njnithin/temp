(function ($) {
  var $resourceData = [];
  /*** Used in resource listing page: Ministerial tab. ***/
  $.extend({
    resourceMenuData: function () {
      // console.log('return minisertial tab meeting data');
      return $resourceData;
    }
  });
  // $.fn.resourceMenuData = function () {
  //   console.log('return minisertial tab meeting data');
  // }
  /*** END OF Used in resource listing page: Ministerial tab. ***/
  function headerSubMenu() {
    var $struct = '',
      $random = '?' + (Math.random() + 1).toString(36).substring(7);
    $.getJSON(
      '/header-menu-json' + $random,
      // '/themes/custom/hoai/components/layouts/header/header-sub-menu/json/menu-json.json' + $random,
      function (menuData) {
        menuData.forEach(function (mainMenuItem) {
          travelMenu(mainMenuItem, 0, false);
          if ($struct.trim() != '') {
            var $mainLink = $('.site-header .navbar-nav > li >a[href="' + mainMenuItem.link + '"]');
            $mainLink
              .closest('li')
              .addClass('has-sub')
              .closest('ul')
              .addClass('level-0 root-level');
            $mainLink
              .addClass('has-sub')
              .after($struct);
            // console.log($mainLink, mainMenuItem.link, $struct);
          }
          $struct = '';
        });
        // $('.site-header').append($struct);
        externalLinksInNewTab();
        subMenuEvents();
        setTimeout(function () {
          activateParentLink();
          $.magnifyWrapSublinks();
          activateSubLinks();
          $('.site-header').addClass('submenu-appended');
        }, 200);
      }
    );
    function travelMenu(menuItem, level, isSub) {
      if (menuItem.hasSub === true) {
        level++;
        $struct += '<ul class="sub-item level-' + level + '">';
        if (level > 0) {
          var $parentLink = menuItem.link.trim(),
            $parentText = menuItem.text;
          $struct += '<li class="back-li"><a class="back-btn" href="#">BACK</a></li>';
          var $noLinkClass = ($parentLink === '#' || $parentLink === '/') ? 'no-link' : 'has-link'
          $struct += '<li class="parent-link ' + $noLinkClass + '"><a href="' + $parentLink + '">' + $parentText + '</a></li>';

        }
        // console.log(menuItem)
        // for using in /resources --> ministerial tab
        if (menuItem.link === '/resources') {
          // console.log(menuItem.sub_menu);
          $resourceData = menuItem.sub_menu;
          // console.log($resourceData)
        }
        menuItem.sub_menu.forEach(function (subItem) {
          var $hasSubClass = subItem.hasSub === true ? 'has-sub' : 'no-sub';
          $struct += '<li class="sub-link ' + $hasSubClass + '"><a  href="' + subItem.link + '">' + subItem.text + '</a>';
          travelMenu(subItem, level, true);
          $struct += '</li>';
        });
        $struct += '</ul>';
      } else {
        return;
      }
    }
  }
  function activateParentLink() {
    $('.site-header .parent-link.has-link').each(function () {
      var $parentLi = $(this),
        $parentLink = $parentLi.find('>a'),
        $mainLink = $parentLi.closest('.sub-item').siblings('a');
      if (
        $mainLink.attr('href') === $parentLink.attr('href') &&
        $mainLink.is('.active,.is-active')
      ) {
        $parentLink.addClass('header-sub-menu-js ' + $.parentActiveClasses());
      }
    });
  }
  function activateSubLinks() {
    var pathname = window.location.pathname,
      page = pathname.split('/')[1],
      $subLink = $('.sub-link a[href="/gallery"]'),
      $pageType;
    $activeClasses = $.activeLinkClasses();
    if (
      page === "gallery" ||
      page === 'photo-gallery' ||
      page === 'video-gallery'
    ) {
      if (
        (page === 'gallery' && window.location.hash === '') ||
        (page === 'gallery' && window.location.hash === 'photos') ||
        (page === 'photo-gallery')
      ) {
        $pageType = 'photos';
      } else if (
        (page === 'gallery' && window.location.hash === 'videos') ||
        page === 'video-gallery'
      ) {
        $pageType = 'videos';
      }
      $subLink
        .addClass($activeClasses)
        .parent()
        .addClass($activeClasses)
        .find('.sub-link a[href="/gallery#' + $pageType + '"]')
        .addClass($activeClasses)
        .parent()
        .addClass($activeClasses);
    }
  }
  function subMenuEvents() {
    /*** Touch Devices. ***/
    /* parent li is repeated inside */
    $(document).on(
      'click',
      '.site-header .nav-item.has-sub >a, .site-header .sub-link.has-sub >a',
      function (e) {
        if (isTouchDevice()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    );
    function isTouchDevice() {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    /*** END OF Touch Devices. ***/
    /*** URL HASH Issues on same page. ***/
    $(document).on(
      'click',
      '.site-header .root-level a:not(.back-btn)',
      function (e) {
        var $pathName = window.location.pathname,
          $url = window.location.origin + $(this).attr('href'),
          $urlObj = new URL($url),
          $clickedPathName = $urlObj.pathname,
          $isMobileSubLink = $(window).width() < 992 && $(this).parent().hasClass('has-sub'),
          $MagnifiedHeaderSubLink = $('html.magnified-font').length && $(this).parent().hasClass('has-sub');
        // console.log($pathName, $clickedPathName);
        if (!$isMobileSubLink && !$MagnifiedHeaderSubLink && ($pathName === $clickedPathName)) {
          // e.preventDefault();
          var $hash = $urlObj.hash;
          /* prevent click for the link with sub item in thouch device */
          if (!((isTouchDevice() === true) && $(this).parent().hasClass('has-sub'))) {
            if ($('.progress-page').length) {
              let $leftLink = $('.progress-left ' + $hash + '');
              if ($leftLink.length) {
                $leftLink.trigger('click');
              }
            }
            else if (
              $(
                '.listing-page,.projects-page,.what-we-do-page,.gallery-folder-page'
              ).length
            ) {
              setTimeout(function () {
                let $scrollSec = $($hash);
                if ($scrollSec.length) {
                  if (
                    $scrollSec.hasClass('each-tab')
                  ) {
                    // tab section
                    $scrollSec
                      .removeClass('active')
                      .trigger('click');
                  } else {
                    // scroll sec is in another tab
                    var $tabsSec = $scrollSec.closest('.custom-tabs-sec');
                    if (!$tabsSec.hasClass('active')) {
                      $('.custom-tabs .each-tab[value="' + $tabsSec.attr('value') + '"]')
                        .trigger('click');
                      // console.log('click from header-sub-menu.js')
                      window.location.hash = '';
                      setTimeout(function () {
                        window.location.hash = $hash;
                        activateSublink();
                      }, 850);
                    }
                    // console.log('no tab id ', $scrollSec)
                    // console.log($hash, $clickedPathName)
                    // console.log($clickedPathName + $hash)
                    activateSublink();
                    function activateSublink() {
                      $.activateSubLink(
                        $clickedPathName + $hash,
                        false,
                        true,
                        false,
                        true
                      );
                    }
                  }
                }
              }, 700);

            }
          }
        }

      }
    );
    /*** END OF URL HASH Issues on same page. ***/
    // used in pages like listing pages (eg: resources)),what we do,projects
    $(document).on('click', '.custom-tabs .each-tab', function () {
      var $clickedTab = $(this),
        $pathName = window.location.pathname,
        $hrefInHeader = $pathName + '#' + $clickedTab.attr('id');
      // console.log('activate menu on tab change: from header-sub-menu.js');
      $.activateSubLink($hrefInHeader, false, true, false, false);
      /*** Deactivate inner sublinks near the changed tab. ***/
      var $nonActiveTabs = $('.each-tab:not(.active)');
      // console.log('non active tabs', $nonActiveTabs);
      setTimeout(function () {
        $nonActiveTabs
          .each(function () {
            var $currentTab = $(this),
              $tabID = $currentTab.attr('id')
            $.resetDirectSubLinks($pathName, $tabID);
          });
      }, 300);
      /*** END OF Deactivate inner sublinks near the changed tab. ***/
    });

  }
  $(document).ready(function () {
    headerSubMenu();
  });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
