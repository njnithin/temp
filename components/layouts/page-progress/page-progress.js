(function ($) {
  function pageProgress() {
    // var scrollVal = 0;
    var articlesWrapper = $(".progress-block .cd-articles");
    articlesWrapper.find('footer').remove();
    if (articlesWrapper.length > 0) {
      // cache jQuery objects
      var articles = articlesWrapper.find(".common-article"),
        aside = $(".progress-block .cd-read-more"),
        articleSidebarLinks = aside.find("li");
      // initialize variables
      var scrolling = false,
        sidebarAnimation = false,
        resizing = false,
        // mq = checkMQ(),
        svgCircleLength = parseInt(
          Math.PI * (articleSidebarLinks.eq(0).find("circle").attr("r") * 2)
        );
      // check media query and bind corresponding events
      //if( mq == 'desktop' ) {
      $(window).on("scroll", checkRead);
      $(window).on("scroll", checkSidebar);
      //}
      $(window).on("resize", resetScroll);
      updateArticle();
      updateSidebarPosition();
      aside.on("click", "li > a", function (event) {
        event.preventDefault();
        var selectedArticle = articles.eq($(this).parent("li").index()),
          selectedArticleTop = selectedArticle.offset().top;
        /* if (window.innerWidth <= 767) {
          selectedArticleTop =
            selectedArticleTop - $(".progressive-left-menu").innerHeight() + 30;
        } */
        $(window).off("scroll", checkRead);
        //
        var exScrollFirst = $(".progressive-left-menu.fixed").length ? 0 : 20;
        if (
          $("body.scrolling-up").length &&
          $(".progressive-left-menu.fixed").length == 0
        ) {
          exScrollFirst = 19;
        }
        //
        var isFirstItem = $(this).closest('li').index() === 0,
          $minusVal = 55;
        if (isFirstItem) {
          $minusVal += 50;
        }
        if ($('.toolbar-fixed.toolbar-tray-open').length) {
          $minusVal += 79;
        }
        else if ($('.toolbar-fixed:not(.toolbar-tray-open)').length) {
          $minusVal += 40;
        }
        $("body,html").animate(
          {
            // scrollTop: selectedArticleTop - $("header").height() - 60,
            scrollTop: selectedArticleTop - $minusVal + 10
          },
          100,
          function () {
            checkRead();
            $(window).on("scroll", checkRead);
            scrollCheckFn(selectedArticleTop, exScrollFirst);
          }
        );
      });
    }

    function scrollCheckFn(elm, exScrl) {
      if ($("body.scrolling-down").length) {
        // console.log(exScrl);
        $("html, body").animate(
          {
            scrollTop: elm - 50 - exScrl,
          },
          50
        );
      } else if (exScrl == 19) {
        // console.log(exScrl);
        $("html, body").animate(
          {
            scrollTop: elm - 50 - exScrl,
          },
          50
        );
      }
    }

    function checkRead() {
      if (!scrolling) {
        scrolling = true;
        !window.requestAnimationFrame
          ? setTimeout(updateArticle, 300)
          : window.requestAnimationFrame(updateArticle);
      }
    }

    function checkSidebar() {
      if (!sidebarAnimation) {
        sidebarAnimation = true;
        !window.requestAnimationFrame
          ? setTimeout(updateSidebarPosition, 300)
          : window.requestAnimationFrame(updateSidebarPosition);
      }
    }

    function resetScroll() {
      if (!resizing) {
        resizing = true;
        !window.requestAnimationFrame
          ? setTimeout(updateParams, 300)
          : window.requestAnimationFrame(updateParams);
      }
    }

    function updateParams() {
      windowHeight = $(window).height();
      mq = checkMQ();
      $(window).off("scroll", checkRead);
      $(window).off("scroll", checkSidebar);
      //if( mq == 'desktop') {
      $(window).on("scroll", checkRead);
      $(window).on("scroll", checkSidebar);
      //}
      resizing = false;
    }

    function updateArticle() {
      var scrollTop = $(window).scrollTop();
      articles.each(function () {
        var article = $(this),
          articleTop = article.offset().top - $("header").height(),
          articleHeight = article.outerHeight(),
          articleSidebarLink = articleSidebarLinks
            .eq(article.index())
            .children("a");
        if (window.innerWidth <= 991) {
          articleTop = articleTop - 60;
        }
        //alert( articleHeight);
        //alert(scrollTop +">="+ articleTop +"&&"+ articleTop + articleHeight +">"+ scrollTop);
        // if (article.is(":last-of-type")) {
        //   articleHeight = articleHeight - windowHeight;
        // }
        // if (articleTop > scrollTop + 100) {// removed because multiple active at a time
        if (articleTop > scrollTop) {
          // console.log('innnn-1')
          articleSidebarLink.removeClass("read reading").find(".progress").css({
            width: "0%",
          });
          // console.log(articleSidebarLink);
          articleSidebarLink.parents("li").removeClass("active-section");
        } else if (
          scrollTop >= articleTop - 100 &&
          articleTop + articleHeight > scrollTop
        ) {
          // console.log('innnn-2')
          var dashoffsetValue =
            svgCircleLength * (1 - (scrollTop - articleTop) / articleHeight);
          var menuwidth = articleSidebarLink.addClass("reading").width();
          var progress = (scrollTop - articleTop) / articleHeight;
          progress = progress * 100;
          articleSidebarLink
            .addClass("reading")
            .removeClass("read")
            .find(".progress")
            .css({
              width: progress + "%",
            });
          activateHeaderLink(articleSidebarLink);
          // console.log(articleSidebarLink.parents("li"))
          articleSidebarLink.parents("li").addClass("active-section");
          $(this)
            .addClass("activeContent")
            .siblings()
            .removeClass("activeContent");
          changeUrl(articleSidebarLink.attr("href"));
        } else {
          // console.log('innnn-else')
          var totallen = articleSidebarLinks.length;
          // console.log(articleSidebarLink.parent("li").index(), totallen - 1)
          if (articleSidebarLink.parent("li").index() == totallen - 1) {
            articleSidebarLink
              .removeClass("reading")
              .addClass("read")
              .find(".progress")
              .css({
                width: "100%",
              });
            articleSidebarLink.parents("li").removeClass("active-section");
          } else {
            articleSidebarLink
              .removeClass("reading")
              .addClass("read")
              .find(".progress")
              .css({
                width: "0%",
              });
            articleSidebarLink.parents("li").removeClass("active-section");
          }
        }
      });
      scrolling = false;
    }
    function activateHeaderLink(sidebarLink) {
      // console.log('update sidebar link')
      var $hrefInHeader = window.location.pathname + '#' + sidebarLink.attr('id');
      // $activeClasses = 'active is-active page-progress-js';
      $.activateSubLink(
        $('.site-header a[href*="' + $hrefInHeader + '"]'), true, false, false
      );
      // .addClass($activeClasses)
      // .closest('li')
      // .siblings()
      // .find('>a')
      // .removeClass($activeClasses);
    }

    function updateSidebarPosition() {
      sidebarAnimation = false;
    }

    function changeUrl(link) {
      var pageArray = location.pathname.split("/"),
        actualPage = pageArray[pageArray.length - 1];
      //if (actualPage != link && history.pushState)
      //window.history.pushState({path: link }, '', link);
    }

    function checkMQ() {
      return window
        .getComputedStyle(articlesWrapper.get(0), "::before")
        .getPropertyValue("content")
        .replace(/'/g, "")
        .replace(/"/g, "");
    }
    /*** Trigger Click to active tab on # in url. ***/
    var $hash = window.location.hash;
    if ($hash !== '') {
      let $leftLink = aside.find('' + window.location.hash + '');
      if ($leftLink.length) {
        setTimeout(function () {
          $leftLink.trigger('click');
        }, 300);
      }
    }
    /*** END OF Trigger Click to active tab on # in url. ***/
  }
  $(window).on("load", function () {
    pageProgress();
  });
})(jQuery);
