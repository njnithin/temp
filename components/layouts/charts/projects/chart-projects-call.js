(function ($) {
  function getData() {
    const chartInfo = [
      {
        "url": '/active-projects-charts-json',
        "chartArea": $('.active-projects .charts')
      },
      {
        "url": '/pipeline-projects-charts-json',
        "chartArea": $('.pipeline-projects .charts')
      }
    ];
    chartInfo.forEach(function (info, index) {
      drawChart(info.url, info.chartArea)
    });
    function drawChart(dataURL, chartArea) {
      dataURL += '?' + (Math.random() + 1).toString(36).substring(7);
      $.getJSON(dataURL, function (fullData) {
        fullData.forEach((chartData, index) => {
          chartArea.chartProject(chartData);
        });
      });
    }
  }
  // $(document).ready(function () { initialSettings(); });
  $(window).on('load', function () { getData(); });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
