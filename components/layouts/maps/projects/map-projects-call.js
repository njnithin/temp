(function ($) {
  function getWorldBankMapPath() {
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
        drawMaps(mapLayers);
      })
      .catch(error => console.error('Error fetching World bank map data:', error));
  }
  function drawMaps(mapLayers) {
    var mapsInfo = [
      {
        "url": "/active-projects-map-json",
        "mapArea": $('.active-projects .map-area')
      },
      {
        "url": "/pipeline-projects-map-json",
        "mapArea": $('.pipeline-projects .map-area'),
      }
    ]
    mapsInfo.forEach(function (mapInfo, index) {
      drawMapUsingWidget(mapInfo.url, mapInfo.mapArea)
    });
    function drawMapUsingWidget(dataURL, mapArea) {
      dataURL += '?' + (Math.random() + 1).toString(36).substring(7);
      $.getJSON(dataURL, function (fullData) {
        mapArea.wbMapProject({
          mapLayers: mapLayers,
          fullData: fullData[0],
          all: fullData[0]["all"],
          data: fullData[0]["countries"]
        });
      });
    }
  }
  $(document).ready(function () {
    getWorldBankMapPath();
  });
}(jQuery));
