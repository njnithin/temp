/* functions used */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (attr) {
    element.setAttribute(attr, attributes[attr]);
  });
}

function ayDefaultSettings() {
  return {
    'ay-theme': 'none',
    'ay-font-zoom': 1,
    'ay-links-underline': 'none',
    'ay-readable-font': 'none',
  };
}
function getAySettings() {
  return aySettings;
}
