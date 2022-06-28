// OAuthのGitHub外部認証をした後に、cookieとReduxに
// ユーザー情報の保存を行うカスタムフック

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { login } from "reducks/user/actionCreator";
import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";

const useAuthGithub = () => {
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const oauthScript = document.createElement("script");
    oauthScript.src =
      "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
    document.body.appendChild(oauthScript);
  }, []);

  const loginToSaveReduxStore = (data) => {
    return new Promise((resolve) => {
      dispatch(
        login({
          uid: data.id,
          displayName: data.login,
          photoUrl: data.avatar_url,
        })
      );
      resolve();
    });
  };

  /**
   * cookieにGitHubのデータを保存するメソッド。ログイン認証が終わってから1時間が有効期限。
   * @param {string} name
   * @param {string} value
   * @param {object} options
   * @returns {string}
   */
  const setCookie = (name, value, options) => {
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
      resolve();
    });
  };

  const onAuthGitHubHandler = async (e) => {
    e.preventDefault();
    // API keyを使ってOAuth.ioを初期化する。
    window.OAuth.initialize("RcbjgasvsZMYQ9ZGiw-SgzZzJJo");

    // ポップアップウインドウを表示し、Githubの承認する。
    try {
      const provider = await window.OAuth.popup("github");
      const data = await provider.get("/user");
      await Promise.all([
        loginToSaveReduxStore(data),
        setCookie("id", String(data.id), { expires: 1, secure: true }),
        setCookie("displayName", String(data.login), {
          expires: 1,
          secure: true,
        }),
        setCookie("photoUrl", String(data.avatar_url), {
          expires: 1,
          secure: true,
        }),
      ]);
      sweetAlertOfSuccess(
        `GitHubアカウントを利用したログイン認証に成功しました!`
      );
    } catch (err) {
      console.error(err);
      sweetAlertOfError(
        `エラーが発生してログインに失敗しました。\nエラー内容: ${err}`
      );
    }
  };

  return { message, setMessage, onAuthGitHubHandler };
};

export default useAuthGithub;
