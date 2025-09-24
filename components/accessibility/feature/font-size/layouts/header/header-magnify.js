(function ($) {

  //responsive menu function
  function ayMenu() {
    //toggle
    $(document).on('click', '.ay-menu-toggle', function (e) {
      e.preventDefault();
      $(this).toggleClass('ay-menu-open');
      $('.dropdown-toggle.show-menu').removeClass('show-menu');
    });
    //outside click menu
    $(document).click(function (e) {
      var container = $('.ay-menu-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.ay-menu-toggle').removeClass('ay-menu-open');
        $('.dropdown-toggle.show-menu').removeClass('show-menu');
      }
    });
    //submenu
    // var $dropDown = $('.site-header .navbar-nav .dropdown');
    // $dropDown.each(function () {
    //   var $parentLink = $(this).find('> a'),
    //     $href = $parentLink.attr('href').trim(),
    //     $noLink = '';
    //   if ($href === undefined || $href === null || $href === '') {
    //     $noLink = 'no-link'
    //   }
    //   var $cloned = '<li class="back-li"><a class="back-btn" href="#"> BACK </a></li><li class="parent-link ' + $noLink + '"><a href="' + $href + '">' + $parentLink.text().trim() + '</a></li>'
    //   $(this).find('.dropdown-menu').prepend($cloned);
    // });
    // //dropdown parent clicl
    // $(document).on("click", ".site-header .navbar-nav .dropdown > a", function (e) {
    //   e.preventDefault();
    //   $(this).addClass('show-menu');
    // });
    // $(document).on("click", ".parent-link.no-link a", function (e) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // });
    // //back click
    // $(document).on("click", ".back-btn", function (e) {
    //   e.preventDefault();
    //   $(this).closest('.dropdown').find('>a').removeClass('show-menu');
    // });
  }
  $(window).on('load', function () {
    ayMenu();
  })
}(jQuery));
