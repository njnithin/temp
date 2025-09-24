// key figures is now common ( Key figures in homepage --> https://projects.panapps.co/issues/348319)
(function ($) {
  var notRun = true,
    settingsDone = false;
  /*key figure section counter*/
  function runCounterOnScroll() {
    var scrollTop = $(window).scrollTop(),
      counterSection = $(".counter-wrap"),
      counterSectionTop = counterSection.offset().top,
      headerHeight = $('.site-header').outerHeight(),
      topVal = $(window).width() >= 768 ? 200 : 0;
    if (counterSection.length && notRun) {
      let offset = counterSectionTop - headerHeight - topVal;
      if (scrollTop > offset) {
        runCounter(counterSection);
      }
    }
  }

  function runCounter(counterSection) {
    var counterValues = counterSection.find(".content-no");
    counterValues.text("0");
    $.each(counterValues, function () {
      var counterItem = $(this),
        finalValue = parseFloat(counterItem.attr("data-final"));
      // console.log(finalValue)
      $({
        counter: 0
      }).animate({
        counter: finalValue
      }, {
        duration: 3000,
        //Progress animation at constant pace using linear
        easing: 'swing',
        step: function () {
          //Every step of the animation, update the number value
          //Use ceil to round up to the nearest whole int
          counterItem.text(thousandSeperator(Math.ceil(this.counter)));
        },
        complete: function () {
          finalValue = isInt(finalValue) ? Math.ceil(finalValue) : finalValue.toFixed(2);
          function isInt(n) {
            return n % 1 === 0;
          }
          // counterItem.text(thousandSeperator(Math.ceil(finalValue)));
          counterItem.text(thousandSeperator(finalValue));
          //Could add in some extra animations, like a bounc of colour change once the count up is complete.
        }
      });
    });

    function thousandSeperator(num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }
    notRun = false;
  }
  function initialSettings(callBack) {
    if ($('.counter-wrap').length) {
      $('body').addClass('counter-item-present');
    }
    $('.content-no').text('0');
    /* set to zero initially */
    // $('.content-no').attr('data-final', 0);
    /*initial setting: value to 0 for counter*/
    /*  $('.content-no').each(function () {
       let $currentNo = $(this),
         $floatVal = parseFloat($currentNo.text().trim()),
         $finalVal = isNaN($floatVal) ? 0 : $floatVal;
       $currentNo.attr('data-final', $finalVal);
       $currentNo.text('0');
     }); */
    setTimeout(function () {
      callBack();
    }, 400);
    settingsDone = true;
  }
  $(window).on("load", function () {
    initialSettings(runCounterOnScroll);
  });
  $(window).on("scroll", function () {
    if (settingsDone) {
      runCounterOnScroll();
    }
  });
})(jQuery);
