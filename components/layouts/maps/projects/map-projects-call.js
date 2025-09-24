(function ($) {
  var mapsInfo = [
    {
      "tabValue": 1,
      "url": "/active-projects-map-json",
      "mapArea": $('.active-projects .map-area')
    },
    {
      "tabValue": 2,
      "url": "/pipeline-projects-map-json",
      "mapArea": $('.pipeline-projects .map-area'),
    },
    {
      "tabValue": 3,
      "url": "/asa-map-json",
      "mapArea": $('.advisory-services-and-analytics .map-area'),
    }
  ]
  function getWorldBankMapPath() {
    console.clear();
    const urlsToFetch = [
      {
        "url": '/libraries/wb-world-map/world_afr_only.json',
        "variable_name": "geojsonPath"
      },
      {
        "url": '/libraries/wb-world-map/WB_GAD_Disputes_Generalized_afr_only.json',
        "variable_name": "disputedPath"
      },
      {
        "url": '/libraries/wb-world-map/DisputedBordersWGS84fix.json',
        "variable_name": "intlBorderPath"
      },
    ];
    // Map URLs to fetch promises and store in an array
    const fetchPromises = urlsToFetch.map(item => fetch(item.url).then(response => response.json()));
    // Use Promise.all() to handle all fetch promises
    Promise.all(fetchPromises)
      .then(responses => {
        const responseData = responses.map(response => response),
          mapLayers = {};
        // console.log('Wb JSON urls loaded');
        urlsToFetch.map((item, index) => {
          mapLayers[item.variable_name] = responseData[index];
        });
        // drawMaps(mapLayers);
        drawMapSettings(mapLayers);
        // console.log(mapLayers);
      })
      .catch(error => console.error('Error fetching World bank map data:', error));
  }
  function drawMapSettings(mapLayers) {
    drawMap($('.custom-tabs .each-tab.active'), mapLayers);
    // fetch map on switching tabs
    $(document).on('click', '.custom-tabs .each-tab:not(.map-loaded)', function () {
      drawMap($(this), mapLayers);
    });
    function drawMap($activeTab, mapLayers) {
      let $tabIndex = parseInt($activeTab.attr('value'));
      mapsInfo.forEach(function (mapInfo, index) {
        if (mapInfo.tabValue === $tabIndex) {
          console.log($tabIndex)
          drawMapUsingWidget(mapInfo.url, mapInfo.mapArea, mapLayers, $activeTab);
          console.log($activeTab, mapLayers);
        }
      });
    }
  }
  function drawMaps(mapLayers) {
    mapsInfo.forEach(function (mapInfo, index) {
      drawMapUsingWidget(mapInfo.url, mapInfo.mapArea)
    });
  }
  // function drawMapUsingWidget(dataURL, mapArea) {
  function drawMapUsingWidget(dataURL, mapArea, mapLayers, $activeTab) {
    console.log(dataURL, mapArea)
    dataURL += '?' + (Math.random() + 1).toString(36).substring(7);
    $.getJSON(dataURL, function (fullData) {
      console.log(fullData)
      mapArea.wbMapProject({
        mapLayers: mapLayers,
        fullData: fullData[0],
        all: fullData[0]["all"],
        data: fullData[0]["countries"]
      });
      $activeTab.addClass('map-loaded');
    });
  }
  $(document).ready(function () {
    getWorldBankMapPath();
  });
}(jQuery));
