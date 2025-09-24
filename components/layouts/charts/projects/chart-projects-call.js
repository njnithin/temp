(function ($) {
  const chartInfo = [
    {
      "tabValue": 1,
      "url": '/active-projects-charts-json',
      "chartArea": $('.active-projects .charts')
    },
    {
      "tabValue": 2,
      "url": '/pipeline-projects-charts-json',
      "chartArea": $('.pipeline-projects .charts')
    },
    {
      "tabValue": 3,
      "url": '/asa-charts-json',
      "chartArea": $('.advisory-services-and-analytics .charts')
    }
  ];
  function getData() {
    drawChartSettings();
    /* chartInfo.forEach(function (info, index) {
      drawChart(info.url, info.chartArea);
    }); */
    function drawChartSettings() {
      drawCharts($('.custom-tabs .each-tab.active'));
      // fetch map on switching tabs
      $(document).on('click', '.custom-tabs .each-tab:not(.chart-loaded)', function () {
        drawCharts($(this));
      });
    }
    function drawCharts($activeTab) {
      let $tabIndex = parseInt($activeTab.attr('value'));
      chartInfo.forEach(function (chartInfo, index) {
        if (chartInfo.tabValue === $tabIndex) {
          drawChart($activeTab, chartInfo.url, chartInfo.chartArea);
        }
      });
    }
    // function drawChart(dataURL, chartArea) {
    function drawChart($activeTab, dataURL, chartArea) {
      dataURL += '?' + (Math.random() + 1).toString(36).substring(7);
      $.getJSON(dataURL, function (fullData) {
        fullData.forEach((chartData, index) => {
          chartArea.chartProject(chartData);
        });
        $activeTab.addClass('chart-loaded');
      });
    }
  }
  // $(document).ready(function () { initialSettings(); });
  $(window).on('load', function () { getData(); });
  // $(window).on('scroll', function () {});
  // $( document ).ajaxComplete(function() {})
  // $(window).on('resize', function () {});
}(jQuery));
