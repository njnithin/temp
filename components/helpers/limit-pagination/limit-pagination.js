$.fn.limitPagination = function (limit) {
  if (limit === undefined || isNaN(parseInt(limit))) {
    limit = 3; // default items
  }
  var pagination = this,
    pageNos = pagination.find('.page-item:not(.pager__item--first,.pager__item--previous,.pager__item--next,.pager__item--last)'),
    pageNosLength = pageNos.length,
    // active = pagination.find('.active'),
    first = pagination.find('.pager__item--first').find('span:nth-child(2)').text('«'),
    // prev = pagination.find('.pager__item--previous').find('span:nth-child(2)').text('‹'),
    last = pagination.find('.pager__item--last').find('span:nth-child(2)').text('»');
  // next = pagination.find('.pager__item--next').find('span:nth-child(2)').text('›');
  pagination.removeClass('show-pagination');
  pageNos.removeClass('show-page');
  // console.log(pagination.length > 0, pageNosLength > limit);
  // Guard
  if (
    !(
      (pagination.length > 0) &&
      (pageNosLength > limit)
    )) {
    return;
  }
  /* Limit Pagination */
  var pageToShow;
  if (first.length && last.length) {
    $.each(pageNos, function (index) {
      var current = $(this);
      if (current.hasClass('active')) {
        var showCount = ((limit - 1) / 2),
          index = index + 1,
          beforeIndex = (index - showCount - 1),
          afterIndex = (index + showCount);
        if (afterIndex > pageNosLength) {
          beforeIndex -= (afterIndex - pageNosLength);
          afterIndex = pageNosLength;
        }
        if (beforeIndex < 0) {
          afterIndex -= beforeIndex;
          beforeIndex = 0;
        }
        pageToShow = pageNos.slice(beforeIndex, afterIndex);
      }
    })
  }
  else {
    if (last.length) {
      pageToShow = pageNos.slice(0, limit);
    }
    else if (first.length) {
      pageToShow = pageNos.slice(-limit);
    }
  }
  if (pageToShow != undefined) {
    pageToShow.addClass('show-page');
  }
  /* End of Limit Pagination */
  pagination.addClass('show-pagination');
};
(function ($) {
  function limitSettings() {
    var $limit = 5;
    if (window.innerWidth < 768) {
      if (window.innerWidth < 399) {
        $limit = 3;
      }
      $('.pagination.js-pager__items').limitPagination($limit);
    }
  }
  // $(document).ready(function () { limitSettings(); });
  $(window).on('load', function () {
    limitSettings();
  });
  // commented since the pagination in search is not ajax
  /* $( document ).ajaxComplete(function() {
    limitSettings();
  }); */
}(jQuery));
