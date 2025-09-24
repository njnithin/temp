(function ($) {

  //responsive menu function
  function responsiveMenu() {
    //toggle
    $(document).on('click', '.menu-toggle', function (e) {
      e.preventDefault();
      $(this).toggleClass('menu-open');
      $('.site-header .show-menu')
        .removeClass('show-menu');
    });
    //outside click menu
    $(document).click(function (e) {
      var container = $('.header-mid-right,.menu-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.menu-toggle')
          .removeClass('menu-open');
        $('.site-header .show-menu')
          .removeClass('show-menu');
      }
    });
    //submenu
    $(document).on("click", ".site-header .has-sub > a", function (e) {
      if (isResponsiveMenu()) {
        e.preventDefault();
        $(this)
          .parent()
          .addClass('show-menu');
      }
    });
    $(document).on("click", ".parent-link.no-link a", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    //back click
    $(document).on("click", ".site-header .back-btn", function (e) {
      e.preventDefault();
      $(this)
        .closest('.has-sub')
        .removeClass('show-menu');
    });
  }
  function isResponsiveMenu() {
    return ($(window).width() < 992);
  }
  $(window).on('load', function () {
    responsiveMenu();
  })
}(jQuery));
