(function ($) {
  function infiniteScrollSettings() {
    var $newSec = $('.whats-new-sec'),
      $newContent = $newSec.find('>.view-content'),
      $scrollElement,
      $scrollLeft = 0,
      $eachItemWidth = 0,
      $itemWidth = parseInt($newSec.css('--new-item-width')),
      $itemGap = parseInt($newSec.css('--new-item-gap')),
      $snapAmount = $itemWidth + $itemGap;
    // console.log($snapAmount)
    // console.log($snapAmount);
    // jQuery('.whats-new-item:not(:nth-child(1),:nth-child(2),:nth-child(3),:nth-child(4))').remove();
    // jQuery('.whats-new-item:not(:nth-child(1),:nth-child(2),:nth-child(3))').remove();
    $newContent.wrapInner('<div class="whats-new-items"><div id="whats-new-scroll" class="whats-new-items-scroll"></div></div>');
    setTimeout(function () {
      $scrollElement = $(".whats-new-items-scroll").mCustomScrollbar({
        theme: "hoai-theme",
        axis: "x",
        // live: "on",
        snapAmount: $snapAmount,
        // mouseWheel: { deltaFactor: $snapAmount },
        // disabled after suggestion from sreejith (reported by sreeraj)
        mouseWheel: { enable: false },
        keyboard: {
          scrollAmount: $snapAmount,
          scrollType: "stepped"
        },
        callbacks: {
          onInit: function () {
            $scrollPercentage = this.mcs.leftPct;
            initPrevNext($(this));
            prevNextEvents();
          },
          onScroll: function () {
            // console.log('On scroll ');
            updateSettings(this);
          },
          onUpdate: function () {
            // console.log('On update');
            updateSettings(this);
          }
        }
      });
      $newSec.addClass('loaded');
    }, 300);
    function updateSettings($scrollbar) {
      $scrollLeft = $scrollbar.mcs.left;
      $eachItemWidth = parseInt($($scrollbar).css('--new-item-width'));
      enableDisablePrevNext($scrollbar.mcs.leftPct);
      // console.log($scrollLeft, $eachItemWidth);
    }
    /*********** Prev And Next **************/
    /* Add Prev And Next */
    function initPrevNext(scrollbar) {
      structure = '<div class="new-arrows">\
      <a title="' + Drupal.t("Previous") + '" class="new-arrow new-arrow-prev" href="#">P</a>\
      <a title="' + Drupal.t("Next") + '" class="new-arrow new-arrow-next" href="#">N</a>\
      </div>';
      scrollbar
        .find('.mCSB_scrollTools')
        .prepend(
          structure
        );
      /*  $newSec
         .find('.whats-new-items')
         .prepend(
           '<div class="mobile-arrows">' + structure + ' </diV>'
         ); */
    }
    /* Prev and Next Events */
    function prevNextEvents() {
      $(document).on('click touch touchstart touchmove', '.whats-new-items .new-arrow', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!e.detail || e.detail == 1) {//activate on first click only to avoid hiding again on multiple clicks
          // code here. // It will execute only once on multiple clicks
          // $(this).addClass('disable');
          $(this).hasClass('new-arrow-next') ? $scrollAmount = $eachItemWidth * -1 : $scrollAmount = $eachItemWidth;
          $scrollElement.mCustomScrollbar("scrollTo", $scrollLeft + $scrollAmount);
        }
        /* setTimeout(function(){
          $(this).removeClass('disable');
        },1000); */
      });
    }
    /* Disable Prev and Next  */
    function enableDisablePrevNext($scrollPercentage) {
      var $prev = $scrollElement.closest('.whats-new-items').find('.new-arrow-prev'),
        $next = $scrollElement.closest('.whats-new-items').find('.new-arrow-next');
      if ($scrollPercentage === 0) {
        $prev.addClass('disable');
        $next.removeClass('disable');
      }
      else if ($scrollPercentage === 100) {
        $next.addClass('disable');
        $prev.removeClass('disable');
      } else {
        $next.removeClass('disable');
        $prev.removeClass('disable');
      }
    }
    /*********** End of Prev And Next **************/

  }
  $(document).ready(function () {
    // setTimeout(function () {
    infiniteScrollSettings();
    // }, 2000);
  });
  // $(window).on('load', function () {  });
  // $(window).on('scroll', function () { });
  // $( document ).ajaxComplete(function() { })
  // $(window).on('resize', function () { });
}(jQuery));
