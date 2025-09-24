/* Alias */
/**
 * Author: nj
 * Load more and less functionality
 * @param  {[int]} showCount [total items to be shown (number greater than zero)]
 * @return {[object]}           [loadmore wrapper]
 */
(function ($) {
  $.fn.loadMoreLess = function (showCount, showLess) {
    var loadWrap = this,
      showLess = (showLess === undefined) ? true : showLess;
    if (showCount > 0) {
      var loadItems = loadWrap.find(".loadmore-item"),
        totalLoadItems = loadItems.length,
        noViewMore = $(this).find(".view-more-less-wrap").length === 0;
      if (noViewMore) {
        var viewMoreLessWrap = "<div class='view-more-less-wrap'>";
        viewMoreLessWrap +=
          "<div class='view-more'><a title='Load more items' href='#' class='secondary-btn more-less more'>LOAD MORE</a></div>";
        if (showLess) {
          viewMoreLessWrap +=
            "<div class='view-less'><a title='Load less items' href='#' class='secondary-btn more-less less'>LOAD LESS</a></div>";
        }
        viewMoreLessWrap += "</div>";
        loadWrap.append(viewMoreLessWrap);
      }
      var loadMore = loadWrap.find(".view-more"),
        loadLess = loadWrap.find(".view-less"),
        showItemCount = showCount,
        index = showItemCount;
      if (totalLoadItems > showItemCount) {
        loadLess.hide();
        hideItems(showItemCount, totalLoadItems, loadItems);
      } else {
        loadMore.hide();
        loadLess.hide();
      }

      function hideItems(startIndex, endIndex, loadArray) {
        for (startIndex; startIndex < endIndex; startIndex++) {
          $(loadArray[startIndex]).hide();
        }
      }

      function showItems(startIndex, endIndex, loadArray) {
        for (startIndex; startIndex < endIndex; startIndex++) {
          $(loadArray[startIndex]).show();
        }
      }
      if (noViewMore) {
        loadMore.on("click", function (e) {
          e.preventDefault();
          // $('.loadmore-item.last-item').removeClass('last-item');
          loadWrap.find('.loadmore-item.last-item').removeClass('last-item');
          let items = loadWrap.find('.loadmore-item:visible'),
            lastItem = items.eq(items.length - 1);
          lastItem.addClass('last-item');
          var lastIndex = index + showItemCount;
          showItems(index, lastIndex, loadItems);
          index += showItemCount;
          if (index >= totalLoadItems) {
            loadMore.hide();
            loadLess.show();
          }
        });
        loadLess.on("click", function (e) {
          e.preventDefault();
          index = showItemCount;
          hideItems(index, totalLoadItems, loadItems);
          loadLess.hide();
          loadMore.show();
          setTimeout(function () {
            $("body,html").animate(
              {
                scrollTop: loadWrap.offset().top - 200,
              },
              500
            );
          }, 300);
        });
      }
      loadWrap.addClass('loaded')
    }
    return this;
  };
}(jQuery));
