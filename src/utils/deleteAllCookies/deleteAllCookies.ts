function deleteAllCookies() {
  const cookieArray = document.cookie.split(";");
  for (const cookie of cookieArray) {
    const equalIndex = cookie.indexOf("=");
    const key = cookie.substring(0, equalIndex);
    document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export { deleteAllCookies };
