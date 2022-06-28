/**
 * 引数に渡した文字列から空白を除去する関数
 * @param str
 */

function trimString(str: string) {
  return str.trim().replace(/\s+/g, "");
}

export { trimString };
