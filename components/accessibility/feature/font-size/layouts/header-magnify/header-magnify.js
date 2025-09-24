(function ($) {
  function ayMagnifyMenu() {
    //toggle
    $(document).on('click', '.ay-menu-toggle', function (e) {
      e.preventDefault();
      var $toggleBtn = $(this);
      $toggleBtn.toggleClass('ay-menu-open');
      $('.dropdown-toggle.show-menu').removeClass('show-menu');
      setTimeout(function () {
        // console.log('innn')
        if ($toggleBtn.hasClass('ay-menu-open') === false) {
          closeMenuCompletely();
        }
      }, 300);
    });
    function closeMenuCompletely() {
      $('.magnified-font .site-header .show-sub')
        .removeClass('show-sub');
    }
    //outside click menu
    // $(document).click(function (e) {
    //   var container = $('.ay-menu-toggle');
    //   if (!container.is(e.target) && container.has(e.target).length === 0) {
    //     $('.ay-menu-toggle').removeClass('ay-menu-open');
    //     $('.dropdown-toggle.show-menu').removeClass('show-menu');
    //   }
    // });
    // Sub click
    $(document).on(
      'click',
      '.magnified-font .site-header li.has-sub > a',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this)
          .parent()
          .addClass('show-sub');
      }
    )
    // back click
    $(document).on(
      'click',
      '.magnified-font .site-header .back-li > a',
      function (e) {
        e.preventDefault();
        $(this)
          .closest('li.has-sub')
          .removeClass('show-sub');
      }
    )
    // ay panel click on increase decrease text
    $(document).on(
      'click',
      '.ay-item[key="ay-font-zoom"] a,.ay-item.reset a',
      function () {
        setTimeout(function () {
          $.magnifyWrapSublinks();
        }, 1000);
      }
    );
  }
  $(window).on('load', function () {
    ayMagnifyMenu();
  })
}(jQuery));
