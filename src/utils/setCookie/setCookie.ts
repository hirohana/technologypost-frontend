/**
 * cookieにGitHubのデータを保存するメソッド。ログイン認証が終わってから1時間が有効期限。
 */
const setCookie = (name: string, value: string, options: any) => {
  return new Promise((resolve) => {
    let cook = "";
    cook += `${name}=${encodeURIComponent(value)}`;
    if (options.expires) {
      let exp = new Date();
      exp.setHours(exp.getHours() + options.expires);
      cook += `; expires = ${exp.toUTCString()}`;
    }
    if (options.secure) {
      cook += `; secure`;
    }
    document.cookie = cook;
    resolve(true);
  });
};

export { setCookie };
