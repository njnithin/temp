/* ay-cookie file added on head, to avoid delay on apply accesibility settings page load */
var aySettings = ayDefaultSettings(),
  root = document.querySelector('html');
if (getCookie('ay_settings') === undefined) {
  setCookie('ay_settings', JSON.stringify(aySettings));
} else {
  aySettings = JSON.parse(getCookie('ay_settings'));
}
aySettings['ay-font-zoom'] > 1 ? root.classList.add('magnified-font') : false;
setAttributes(root, aySettings);
