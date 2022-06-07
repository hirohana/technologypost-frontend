// OAuthのGitHub外部認証をした後に、cookieとReduxに
// ユーザー情報の保存を行うカスタムフック

import { useState, useEffect } from "react";

const useAuthGithub = () => {
  const [message, setMessage] = useState({});
  useEffect(() => {
    const oauthScript = document.createElement("script");
    oauthScript.src =
      "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
    document.body.appendChild(oauthScript);
  }, []);

  const onAuthGitHubHandler = (e) => {
    e.preventDefault();
    //　　API keyを使ってOAuth.ioを初期化する。
    window.OAuth.initialize("RcbjgasvsZMYQ9ZGiw-SgzZzJJo");

    // ポップアップウインドウを表示し、Githubの承認する。
    window.OAuth.popup("github").then((provider) => {
      // provier.get()にてGithub's APIから取得も出来る。
      provider.get("/user").then((data) => {
        setMessage(data);
      });
    });
  };
  return { message, onAuthGitHubHandler };
};

export default useAuthGithub;
