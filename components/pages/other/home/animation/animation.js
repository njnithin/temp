(function ($) {
  function homeAnimation() {
    let offsetValue = $('.site-header').outerHeight();
    let fadeUpElements = $(
      '\
         .section-title,\
         .section-desc,\
         .secondary-btn-wrap a,\
         .home-about-left-img,\
         .home-about-box,\
         .what-we-do-readmore,\
         .we-card\
      '
    );
    fadeUpElements.attr({
      "data-aos": "fade-up",
      "data-aos-delay": "10",
      "data-aos-duration": "1000",
      "data-aos-offset": offsetValue
    });
    let delayGap = 300;
    oneByOneWrapper = $(
      '\
      .what-we-do-sec > .view-content,\
      .whats-new-items .mCSB_container,\
      .resources-sec>.view-content,\
      .partners-block .view >.view-content,\
      .status-sec>.view-content\
      '
    );
    fadeUpOneByOne(
      oneByOneWrapper,
      delayGap
    );
    function fadeUpOneByOne(wrapper, delayGap) {
      wrapper.each(function () {
        delay = 0;
        $(this)
          .find('>*')
          .each(function () {
            var item = $(this);
            item.attr({
              "data-aos": "fade-up",
              'data-aos-delay': delay,
              "data-aos-duration": "1000",
              "data-aos-offset": offsetValue
            });
            delay += delayGap;
          });
      });
    }
    AOS.init({
      disable: 'phone',
      once: true
    });
  }

  $(window).on('load', function () {
    setTimeout(function () {
      homeAnimation();
    }, 1500);
  });
}(jQuery));
