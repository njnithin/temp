(function ($) {
  /* Site loader widget  */
  $.fn.siteLoader = function () {
    /* Show Loader */
    wbShowLoader = function () {
      // console.log('loader-shown');
      $('body').addClass('show-loader');
    }
    /* Hide Loader */
    wbHideLoader = function () {
      // console.log('loader-hide');
      $('body').removeClass('show-loader');
    }
    let loaderLocation = this;
    if (loaderLocation.length === 0) {
      return;
    }
    // remove is already present
    loaderLocation
      .find('.site-loader')
      .remove();
    loaderLocation
      .prepend('<div class="site-loader"><div class="site-loader-img"></div></div>');
    return ({
      showLoader: wbShowLoader,
      hideLoader: wbHideLoader
    });
  }
}(jQuery));
