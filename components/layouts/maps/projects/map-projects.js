$.fn.wbMapProject = function (options) {
  console.log(options)
  var self = this,
    mapObject,
    settings = $.extend(
      {
        fullData: {},
        all: [],
        data: {},
      },
      options
    ),
    mapData = settings.data;
  showAllData(settings.all); // for all data
  /* Map layers settings */
  var geojsonPath = settings.mapLayers.geojsonPath,
    disputedPath = settings.mapLayers.disputedPath,
    intlBorderPath = settings.mapLayers.intlBorderPath;
  var intlSeriesData = intlBorderPath.features.filter(function (a) {
    return a.geometry != null;
  });
  mapObject = self
    .find(".map-draw")
    .html("")
    .highcharts("Map", {
      chart: {
        map: geojsonPath,
        animation: false,
        panning: {
          enabled: false,
        },
        zooming: { singleTouch: "none" },
        spacing: [0, 0, 0, 0],
        backgroundColor: "#123a3a",
        credits: {
          enabled: false,
        },
        events: {
          load: function (e) {
            self.addClass("map-loaded");
            events();
            setMapViewBasedOnscreen();
            // e.target.series[1].mapData.filter(function (country) {
            //   // console.log(country);
            //   countryCodes.push({
            //     country_name: country['name'],
            //     country_code: country['iso-a3'],
            //   });
            // })
            // console.log(JSON.stringify(countryCodes, null, '\t'));
          },
        },
      },
      title: {
        text: "",
      },
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        useHTML: true,
        formatter: function () {
          let point = this.point,
            data = point.data,
            total = 0,
            totalFund = 0;
          data.forEach(function (item) {
            if (item.data.length) {
              // total += item.data[0]["count"];
              // totalFund += item.data[0]["total"];
              item.data.forEach(function (obj) {
                total += obj["count"];
                totalFund += obj["total"];
              })
            }
          });
          totalFund = totalFund > 0 ? totalFund.toFixed(2) : totalFund;
          return (
            '\
            <div class="map-tooltip">\
              <div class="map-tooltip-head">\
                <span class="map-tooltip-flag"><img src="' + point.flag + '" alt="' + point.options.name + '"></span>\
                <span class="map-tooltip-label">' + point.options.name + '</span>\
              </div>\
              <div class="map-tooltip-values">\
                <div class="map-tooltip-total">\
                ' + settings.fullData["total_text"] + ': <span class="map-tooltip-total-val ">' + total + '</span>\
                </div>\
                <div class="map-tooltip-fund">\
                Total ($m in USD): <span class="map-tooltip-total-val ">' + totalFund + '</span>\
                </div>\
              </div>\
            </div>\
            '
          );
        }
      },
      mapNavigation: {
        enabled: false,
        enableTouchZoom: false,
        enableDoubleClickZoomTo: false,
        enableDoubleClickZoom: false,
        enableMouseWheelZoom: false,
      },
      // mapNavigation: {
      //   enabled: true,
      //   buttonOptions: {
      //     style: { "display": "none" }
      //   }
      // },
      // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/maps/mapview/center-zoom
      // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/maps/mapview/get-view
      plotOptions: {
        series: {
          stickyTracking: false,
          cursor: "pointer",
        },
      },
      // mapView: {
      //   center: [6129, 5961],
      //   zoom: -2.72
      // },
      series: [
        {
          name: "All",
          data: [],
          allAreas: true,
          borderColor: "#c2cece",
          nullColor: "#889c9c",
          cursor: "none",
          joinBy: ["ISO_A3", "code"],
          showInLegend: false,
          enableMouseTracking: false,
          states: {
            inactive: {
              opacity: 1,
            },
          },
        },
        {
          data: mapData,
          allAreas: false,
          animation: true,
          enableMouseTracking: true,
          joinBy: ["WB_ISO", "country_code"],
          name: "Africa",
          color: "#fff",
          nullColor: "#889c9c",
          borderColor: "#123a3a",
          borderWidth: 1,
          states: {
            hover: {
              color: "#ff7e00",
              borderWidth: 1,
            },
          },
          events: {
            click: function (e) {
              // mapObject.highcharts().tooltip.hide()
              refreshMapBox(createDataPreview(e.point, false));
              e.target.classList.add("active-country");
            },
          },
          shadow: false,
        },
        {
          borderWidth: 1,
          cursor: "none",
          data: [],
          colorKey: "value",
          borderColor: "#889c9c",
          nullColor: "#889c9c",
          joinBy: ["NAME", "key"],
          mapData: disputedPath,
          states: {
            inactive: {
              opacity: 1,
            },
          },
        },
        {
          mapData: intlBorderPath,
          data: intlSeriesData,
          cursor: "none",
          enableMouseTracking: false,
          type: "mapline",
          borderColor: "r",
          borderWidth: 1,
          allAreas: false,
          states: {
            inactive: {
              opacity: 1,
            },
          },
        },
      ],
    });
  function events() {
    $(window).on("resize", function () {
      setMapViewBasedOnscreen();
    });
    $(document).on('click', '.each-tab', function (e) {
      setMapViewBasedOnscreen();
    });
    $(document).on('click', '.map-box-close', function (e) {
      e.preventDefault();
      showAllData(settings.all);
    });
    // $(document).mouseup(function (e) {
    //   var container = $(
    //     ".map-area .highcharts-point:not(.highcharts-null-point),.map-box"
    //   );
    //   // if the target of the click isn't the container nor a descendant of the container
    //   if (!container.is(e.target) && container.has(e.target).length === 0) {
    //     showAllData(settings.all);
    //   }
    // });
  }
  function setMapViewBasedOnscreen() {
    var $screenSize = $(window).innerWidth(),
      $setViewArray = [31, 9];
    $setViewZoom = 4.18;
    $mapDrawArea = self.find(".map-draw"),
      $chartObj = $mapDrawArea.highcharts(),
      $chartHeight = $screenSize < 768 ? 350 : 521;
    // set size
    $chartObj.setSize($mapDrawArea.innerWidth(), $chartHeight, false);
    // correct the map after enabling mapNavitaion
    // mapNavigation: {
    //     enabled: true,
    //     buttonOptions: {
    //       style: { "display": "none" }
    //     }
    // }
    // correct the respective view manually using mouse
    // to get the values add this code in console
    // printMapView(jQuery('.map-container')) Eg: printMapView(jQuery('.map-draw').eq(0));
    // eg: printMapView($('.active-projects .wb-map.map-area .map-draw'));
    // printMapView this function is written globally so accesible in console
    // printMapView() --> components/helpers/global-functions/global-functions.js
    if ($screenSize > 991 && $screenSize < 1200) {
      $setViewArray = [37, 9];
      $setViewZoom = 4.14;
    } else if ($screenSize > 767 && $screenSize < 992) {
      $setViewArray = [38, 9];
      $setViewZoom = 4.42;
    } else if ($screenSize > 500 && $screenSize < 768) {
      $setViewArray = [36, 8];
      $setViewZoom = 3.88;
    } else if ($screenSize > 399 && $screenSize < 501) {
      $setViewArray = [38, 8];
      $setViewZoom = 3.49;
    } else if ($screenSize > 319 && $screenSize < 400) {
      $setViewArray = [37, 9];
      $setViewZoom = 3.88;
    }
    $chartObj.mapView.setView($setViewArray, $setViewZoom);
  }
  function showAllData(allData) {
    refreshMapBox(createDataPreview(allData, true));
  }
  function createDataPreview(country, isAll) {
    var struct = "",
      totalCount = 0,
      data = isAll ? country : country.data,
      title = isAll ? "All Countries" : country.options.name,
      totalTextKey = settings.fullData["total_text"],
      totalText = totalTextKey != undefined ? totalTextKey : "Total";
    self.find(".active-country").removeClass("active-country");
    if (!isAll) {
      struct += '<a title="All Countries" href="#" class="map-box-close">X</a>';
    }
    struct += '<div class="map-box-flag-title">';
    if (country.flag != "" && !isAll) {
      struct +=
        '<div class="map-box-flag"> <img src="' +
        country.flag +
        '" alt="' +
        title +
        '"></div>';
    } else {
      self
        .find(".highcharts-point-hover")
        .attr("fill", "rgb(255,255,255)")
        .removeClass(".highcharts-point-hover");
    }
    struct += '<div class="map-box-title">' + title + "</div>";
    struct += "</div>";
    struct += '<div class="map-box-content">';
    // console.log(country)
    data.forEach(function (plotItem, index) {
      struct += '<div class="map-box-item">';
      struct += '<div class="map-box-label">' + plotItem.name + "</div>";
      if (plotItem.data.length) {
        // var count = plotItem.data[0]["count"];
        var count = 0;
        plotItem.data.forEach(function (obj) {
          count += obj["count"];
        })
        // struct +=
        //   '<div class="map-box-value">' + plotItem.data[0]["count"] + "</div>";
        struct +=
          '<div class="map-box-value">' + count + "</div>";
        totalCount += count;
      } else {
        struct += '<div class="map-box-value">0</div>';
      }
      struct += "</div>";
    });
    // if (totalCount > 0) {
    struct += '<div class="map-box-item">';
    struct += '<div class="map-box-label"><strong> ' + totalText + "</strong></div>";
    struct +=
      '<div class="map-box-value map-box-value--highlight" >' +
      totalCount +
      "</div>";
    struct += "</div>";
    // }
    struct += "</div>";
    return struct;
  }
  function refreshMapBox(struct) {
    self.find(".map-box").html("").html(struct);
  }
};
