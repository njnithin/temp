(function ($) {
  function ayPanelSettings() {
    var $ayTool = $('.ay-tool'),
      $aySettings = getAySettings(); // from ay-cookie.js
    // console.log($aySettings);
    addActiveClass($aySettings);
    /* Toggle panel */
    $ayTool
      .find('.ay-handicap-icon')
      .on('click', function (e) {
        e.preventDefault();
        $ayTool.toggleClass('open');
      });
    /* End of Toggle panel */
    /* Accessibility click */
    $ayTool
      .find('.ay-item a')
      .on('click', function (e) {
        e.preventDefault();
        var $clicked = $(this),
          $clickeItem = $clicked.closest('.ay-item'),
          $type = $clickeItem.attr('type'),
          $root = $('html'),
          $theme = $root.attr('ay-theme'),
          $fontSizeZoom = parseInt($root.attr('ay-font-zoom')),
          $liun = $root.attr('ay-links-underline'),
          $readableFont = $root.attr('ay-readable-font'),
          $availableThemes = [
            'gray-scale',
            'high-contrast',
            'negative-contrast',
            'light-background'
          ];
        /*** Themes. ***/
        if ($availableThemes.indexOf($type) > -1) {
          // remove theme on toggle
          if ($theme === $type) {
            $type = 'none';
          }
          // $root.attr('ay-theme', $type);
          $aySettings['ay-theme'] = $type;
        }
        /*** END OF Themes. ***/
        /*** Increase Decrease Text. ***/
        if ($type === "increase-text") {
          // $root.attr('ay-font-zoom', $fontSizeZoom + 1);
          $aySettings['ay-font-zoom'] = $fontSizeZoom + 1;
        }
        else if ($type === "decrease-text") {
          // $root.attr('ay-font-zoom', $fontSizeZoom - 1);
          var $zoomVal = $fontSizeZoom - 1;
          if ($zoomVal <= 1) {
            $('html').addClass('unset-magnify');
          }
          $aySettings['ay-font-zoom'] = $zoomVal;
        }
        /*** END OF Increase Decrease Text. ***/
        /*** Modifications. ***/
        else if ($type === "links-underline") {
          if ($liun === $type) {
            $type = 'none';
          }
          // $root.attr('ay-links-underline', $type);
          $aySettings['ay-links-underline'] = $type;
        }
        else if ($type === "readable-font") {
          if ($readableFont === $type) {
            $type = 'none';
          }
          // $root.attr('ay-readable-font', $type);
          $aySettings['ay-readable-font'] = $type;
        }
        /*** Reset. ***/
        else if ($type === "reset") {
          // $('html').attr($aySettings);
          $aySettings = ayDefaultSettings();
        }
        /*** END OF Reset. ***/
        /*** END OF Modifications. ***/
        // $('html').attr($aySettings);
        $('html')
          .attr($aySettings);
        setCookie('ay_settings', JSON.stringify($aySettings));
        addActiveClass($aySettings);
      });
    /* End of Accessibility click */
    //outside click ay-tool
    $(document).click(function (e) {
      var container = $('.ay-tool');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.ay-tool.open').removeClass('open');
      }
    });
    $ayTool.addClass('loaded');
  }
  function addActiveClass($aySettings) {
    // console.log($aySettings);
    Object.keys($aySettings).forEach(function ($attr) {
      var $key = $attr,
        $type = $aySettings[$attr];
      if ($key === 'ay-theme') {
        $('.ay-item[key = "' + $key + '"]')
          .removeClass('active');
        $('.ay-item[type = "' + $type + '"]')
          .toggleClass('active');
      }
      else if ($key === 'ay-font-zoom') {
        var $inText = $('.ay-item[type = "increase-text"]');
        if ($type > 1) {
          $('html')
            .addClass('magnified-font');
          $inText.addClass('active');
        }
        else {
          setTimeout(function () {
            $('html').removeClass('magnified-font unset-magnify')
          }, 500);
          $inText.removeClass('active');
        }
      }
      else if ($key === 'ay-links-underline') {
        var $liun = $('.ay-item[type = "links-underline"]');
        $type === 'links-underline' ? $liun.addClass('active') : $liun.removeClass('active');
      }
      else if ($key === 'ay-readable-font') {
        var $refo = $('.ay-item[type = "readable-font"]');
        $type === 'readable-font' ? $refo.addClass('active') : $refo.removeClass('active');
      }
    });

  }
  $(document).ready(function () { ayPanelSettings(); });
  // $(window).on('load', function () {});
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
