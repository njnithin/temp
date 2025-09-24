(function ($) {
  /* Temporarly disable links for UAT release */
  function temporarilyDisableUATLinks() {
    $linkElementsToPrevent = $(
      "\
      .each-status-item:not(:first-child) .status-card-title a,\
      .each-status-item:not(:first-child) .readmore-arrow\
     "
    );
    $linkElementsToPrevent.addClass("prevent-redirection common-js");
    $(document).on(
      "click",
      ".prevent-redirection",
      function (e) {
        e.preventDefault();
        // console.log("click prevented from common.js");
      }
    );
    // }
    $("body").addClass("prevent-redirection-done");
  }
  // $(document).ready(function () { });

  $(window).on("load", function () {
    externalLinksInNewTab();
    temporarilyDisableUATLinks();
  });
  // $(window).on('scroll', function () { });
  // $( document ).ajaxComplete(function() { })
  // $(window).on('resize', function () { });
})(jQuery);
