$.fn.chartProject = function (options) {
  var self = this,
    chartObject,
    settings = $.extend({}, options),
    chartData = settings.chartData,
    index = self.find('.chart').length;
  // console.log(settings)
  self
    .append(
      '<div class="chart" index ="' + index + '">\
        <div class="chart-card">\
          <div class="chart-top">\
            <div class="chart-card-title">' + settings.title + '</div>\
            <div class="chart-card-desc">' + settings.desc + '</div>\
          </div>\
          <div class="chart-area-box">\
            <div class="chart-draw">\
            </div>\
            <div class="chart-legends">\
            </div>\
          </div>\
        </div>\
      </div>'
    );
  setTimeout(function () {
    var currentChart = self
      .find('.chart').eq(index),
      chartObj;
    chartObj = currentChart
      .find('.chart-draw')
      .highcharts(
        {
          chart: {
            type: 'pie',
            height: 310,
            spacing: 0
          },
          exporting: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          yAxis: {
            title: {
              text: 'Total percent market share'
            }
          },
          legend: {
            symbolRadius: 0,
            symbolPadding: 7,
            symbolWidth: 10,
            symbolHeight: 10,
            useHTML: true,
            floating: true,
            labelFormatter: function () {
              var customLegends = currentChart.find('.chart-legends')
              if (customLegends.find('.custom-legend').length < chartData.length) {
                customLegends
                  .append(
                    ' <div class="custom-legend" index="' + this.index + '">\
                       <div class="custom-legend-square" style=" background: ' + this.color + '; width: 10px;height: 10px;">\
                       </div>\
                       <div class="custom-legend-label">\
                          ' + this.name + '\
                       </div>\
                      </div>\
                    '
                  );
              }
              return '<div class="custom-legend-text">' + this.name + '</div>';
              //        `
              //   <div class="custom-legend-square" style="width: 10px; height:10px; background:${this.color}"></div>
              //   <div class="custom-legend-text">${this.name}</div>
              // `
              // console.log(this)
            }
          },
          plotOptions: {
            series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                enabled: false,
                format: '{point.percentage:.1f}%',
                distance: 0,
                style: {
                  fontSize: '10px'
                }
              }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                  fontSize: '11px',
                  textOutline: 'none',
                }
              }]
            },
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              borderColor: '#fff',
              borderWidth: 3,
              borderRadius: 0,
              colors: [
                // extra colors
                '#fff70f',
                '#a3e7f5',
                '#f26a21',
                // default colors
                '#fdb714',
                '#f09033',
                '#734215',
                '#68ac50',
                '#00ade4',
              ],
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#000',
            borderRadius: 5,
            borderWidth: 0.5,
            shadow: false,
            useHTML: true,
            formatter: function () {
              // return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
              return '<div class="chart-tooltip"> ' + this.point.name + ': ' + this.point.y + '%</div>';
            }
          },
          series: [
            {
              data: chartData,
              // size: 250,
              size: '85%',
              innerSize: '39%',
              showInLegend: true,
              dataLabels: {
                enabled: false
              }
            }
          ]
        },
      );
    events();
    function events() {
      currentChart.find('.custom-legend').on('click', function () {
        var inx = $(this).index(),
          point = currentChart.find('.chart-draw').highcharts().series[0].data[inx];
        $(this).toggleClass('strike-off');
        if (point.visible) {
          point.setVisible(false);
        }
        else {
          point.setVisible(true);
        }
      });
    }
  }, 300);
}
