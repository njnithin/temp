(function ($) {
  var $intervals = []
  // to access this function in header-sub-menu.js
  $.extend({
    activateSubLink: function ($link, $isAnchorTag, $runUntilFind, $activateParentLinks) {
      var $siteHeader = $('.site-header'),
        $isAnchorTag = $isAnchorTag === undefined ? false : $isAnchorTag,
        $runUntilFind = $runUntilFind === undefined ? true : $runUntilFind,
        $activateParentLinks = $activateParentLinks === undefined ? false : $activateParentLinks,
        $linkToActivate;
      /* console.log(
        "link:" + $link + "\n",
        "anchor tag directly passed instead of url:" + $isAnchorTag + "\n",
        "run until header sub loaded:" + $runUntilFind + "\n",
        "activate all parent links:" + $activateParentLinks + "\n"
      ) */
      // console.log('Inside activateSubLink() --> Header.js');
      // an href is passed as parameter
      try {
        if ($runUntilFind === true) {
          // console.log('run until find');
          // check whether submenu not loaded
          // console.log($intrl)
          $intervals.push(setInterval(checkSubmenuAppended, 500));
          function checkSubmenuAppended() {
            if ($siteHeader.hasClass('submenu-appended')) {
              findLinkAndActivate();
              $intervals.forEach(function ($interval) {
                clearInterval($interval);
              });
              // console.log('found !!!', $intervals);
              $intervals = [];
              // console.log('Cleared intervals', $intervals);
              // console.log('Submenu appended');
              return true
            }
            // console.log('Checking whether submenu appended...');
          }
        }
        // target anchor tag element is passed as parameter
        else {
          // console.log('direct link anchor tag element passed');
          findLinkAndActivate();
        }
      } catch (err) {
        console.log(err);
      }
      function findLinkAndActivate() {
        // console.log('findLinkAndActivate() function run');
        //sublinks active)
        // console.log($link);
        if ($isAnchorTag === false) {
          $link = decodeURIComponent($link);
          // console.log($link)
        }
        var $activeClasses = $.activeLinkClasses();
        $linkToActivate = $isAnchorTag ? $link : $siteHeader.find('.sub-link >a[href="' + $link + '"]');
        $linkToActivate
          .addClass($activeClasses)
          .parent()
          .siblings('li:not(.parent-link,.back-li)')
          .find('>a')
          .removeClass($activeClasses);
        if ($linkToActivate.length) {
          /* Issue 5 : https://projects.panapps.co/issues/400696 */
          $locationHash = window.location.hash;
          if ($locationHash) {
            let $hashSublink = $linkToActivate.siblings('.sub-item').find('.sub-link >a[href="' + $link + $locationHash + '"]');
            if ($hashSublink) {
              $hashSublink.addClass($activeClasses);
            }
          }
          // console.log($activateParentLinks)
          if ($activateParentLinks === true) {
            $linkToActivate
              .parents('.sub-link.has-sub')
              .each(function () {
                var $parentLink = $(this),
                  $parentLinkAnchor = $parentLink.find('>a');
                $parentLinkAnchor.addClass(($activeClasses));
                // activate duplicated parent link in sub item
                activateDuplicateParentLink($parentLinkAnchor);
                // console.log('Activated parent section link --> ', $parentLink);
              })
          }
          // activate duplicated parent link in sub item
          activateDuplicateParentLink($linkToActivate);
        }
        function activateDuplicateParentLink($mainLink) {
          $mainLink
            .siblings('.sub-item')
            .find('>.parent-link.has-link >a')
            .addClass($.parentActiveClasses());
        }
      }
    },
    resetDirectSubLinks: function ($pathName, $tabID) {
      $('.site-header a[href*="' + $pathName + '#' + $tabID + '"]')
        .siblings('.sub-item')
        .find('>li>a')
        .removeClass(
          $.activeLinkClasses()
        );
    },
    activeLinkClasses: function () {
      return 'active is-active active-trail active-header-js';
    },
    parentActiveClasses: function () {
      return 'parent-li-active active-header-js';
    },
    magnifyWrapSublinks: function () {
      // console.log($('html.magnified-font').length)
      if ($('html.magnified-font').length) {
        $('.site-header .navbar-nav,.site-header .sub-item')
          .each(function () {
            $(this)
              .find('>li:not(.back-li,.parent-link)')
              .wrapAll(
                '<li class="menu-scroll-panel-li header-js"><ul class="menu-scroll-panel"></li></ul>'
              );
          });
      } else {
        // console.log('unwrap', $('.site-header .menu-scroll-panel'))
        $('.site-header .menu-scroll-panel')
          .each(function () {
            $(this)
              .unwrap()
              .find('>li:first-child')
              .unwrap();
          });
      }
    }
  });
  function setDeviceType() {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      $('body').addClass('non-touch-device');
      $('.site-header .dropdown > .nav-link').removeAttr('data-bs-toggle title');
    }
    else {
      $('body').addClass('touch-device');
    }
  }
  /* Settings for header section */
  function headerSettings() {
    setDeviceType();
    /* User menu click */
    $('.et-user-circle').on('click', function (e) {
      e.preventDefault();
      $('.et-user-menu').toggleClass('open');
      $('.et-user-box').slideToggle(300);
    });
    //outside click menu
    $(document).click(function (e) {
      var container = $('.et-user-menu');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.et-user-box').slideUp(300);
        $('.et-user-menu').removeClass('open');
      }
    });
    /* End of User menu click */
  }
  /* Header Scrolldown animation class set */
  function headerAnimate() {
    if (
      $(window).scrollTop() > 48 && window.innerWidth > 991
    ) {
      $("body").addClass("animate-header");
    } else {
      $("body").removeClass("animate-header");
    }
  }
  /**
 * Activate activate megamenu and responsive menu in certain cases
 */
  function activateMenu() {
    let urlLink = window.location.pathname.split("/")[1];
    // console.log(urlLink)
    if (urlLink != "" && urlLink != undefined) {
      /* 2. Special Cases */
      let activeData = [{
        "paths": [
          "communique",
          "annual-report",
          "publication",
          "news",
          "analytics",
          "technical-meetings"
        ],
        "destinations": ["/resources"],
      }, {
        "paths": [
          "news",
          "events",
          "document-report",
          "publication",
          "mdtf",
          "blogs",
          "stories",
        ],
        "destinations": ["/whats-new"],
      },
      {
        "paths": ["pillar"],
        "classes": ["what-we-do-link"],
      },
      {
        "paths": [
          "gallery"
        ],
        "links": ["/gallery"],
      },
      {
        "paths": [
          "photo-gallery",
          "video-gallery",
        ],
        "drupalPaths": ["resources"],
      }
      ],
        activeDataLength = activeData.length,
        i = 0;
      for (i; i < activeDataLength; i++) {
        var current = activeData[i],
          paths = current.paths,
          links = current.links != undefined ? current.links : [],
          destinations = current.destinations != undefined ? current.destinations : [],
          drupalPaths = current.drupalPaths != undefined ? current.drupalPaths : [],
          targetClasses = current.classes != undefined ? current.classes : [];
        if (paths.indexOf(urlLink) > -1) {
          /* Active links based on drupal path */
          for (j = 0; j < drupalPaths.length; j++) {
            activateLinkWithDrupalPath(drupalPaths[j].replace(/\//g, ""));
          }
          /* Activate based on classes */
          for (j = 0; j < targetClasses.length; j++) {
            $(".site-header ." + targetClasses[j])
              .addClass($.activeLinkClasses())
              .parent()
              .addClass($.activeLinkClasses());
          }
          for (j = 0; j < links.length; j++) {
            // console.log('activate menu from array info')
            $.activateSubLink(links[j], false, true, false);
          }
          /* Activate based on destination */
          for (j = 0; j < destinations.length; j++) {
            let urlParameterDestination = getUrlParam('destination'),
              destination = destinations[j];
            // console.log(urlParameterDestination, destination)
            if (urlParameterDestination != null & urlParameterDestination === destination) {
              activateLinkWithDrupalPath(destinations[j].replace(/\//g, ""));
            }
          }
        }
      }
      /* End of Special Cases*/
    }
    function activateLinkWithDrupalPath(linkPath) {
      var $activeClasses = $.activeLinkClasses();
      $('.site-header a[data-drupal-link-system-path="' + linkPath + '"]')
        .addClass($activeClasses)
        .parent()
        .addClass($activeClasses);
    }
  }
  /*   function activateSubLink($link) {
      //sublinks active
      var $activeClasses = 'active is-active active-header-js',
        $siteHeader = $('.site-header'),
        $linkToActivate = $siteHeader.find('.sub-link >a[href="' + $link + '"]'),
        $isSubmenuAdded = $siteHeader.hasClass('submenu-appended');
      $linkToActivate
        .addClass($activeClasses)
        .parent()
        .siblings()
        .find('>a')
        .removeClass($activeClasses);
    } */
  function headerToggleSearch() {
    function toggleSearchButtonTitle() {
      $('.header-toggle-search').attr("title", function (_, attr) {
        return attr === 'Search' ? Drupal.t("Close") : Drupal.t("Search");
      })
    }
    $(document).on('click', '.header-toggle-search', function (e) {
      e.preventDefault();
      $('body').toggleClass('header-toggle-search-open');
      $('.header-search-block .form-search ').focus();
      toggleSearchButtonTitle();
    });
    $(document).click(function (e) {
      var container = $('.header-toggle-search,.header-search-block');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('body').removeClass('header-toggle-search-open');
        $('.header-toggle-search').attr("title", Drupal.t("Search"));
      }
    });
  }
  $(window).on('load', function () {
    headerSettings();
    activateMenu();
    headerToggleSearch();
    // headerActive()
    setTimeout(function () {
      headerAnimate();
      $('.site-header').addClass('loaded');
      $('body').addClass('header-loaded');
    }, 1000);
  });
  $(window).on('resize', function () {
    setTimeout(function () {
      headerAnimate();
    }, 1000);
  });
  $(window).on("scroll", function () {
    headerAnimate();
  });
  $(window).on('resize', function () {
    setDeviceType();
  });
}(jQuery));
