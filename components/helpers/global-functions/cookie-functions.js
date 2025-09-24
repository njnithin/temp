function setCookie(name, value) {
  document.cookie = name + '=' + value + '; Path=/;';
}
function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
// commented hence not working properly
/* function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name} = `);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
} */
function getCookie(name) {
  const regex = new RegExp('(^| )' + name + '=([^;]+)')
  const match = document.cookie.match(regex)
  if (match) {
    return match[2]
  }
}
