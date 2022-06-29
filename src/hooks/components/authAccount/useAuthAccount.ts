import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { config } from "config/applicationConfig";
import { login } from "reducks/user/actionCreator";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";
import { setCookie } from "utils/setCookie/setCookie";
import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";
import { updateProfile } from "reducks/user/actionCreator";

/**
 * パスワード認証をするフック。useRefを使用した引数emailRef、passwordRefを受け取る。
 * @param emailRef
 * @param passwordRef
 * @returns (e: React.FormEvent<HTMLFormElement>) => Promise<void>
 */
const useAuthAccount = (
  emailRef: React.MutableRefObject<HTMLInputElement | null>,
  passwordRef: React.MutableRefObject<HTMLInputElement | null>
) => {
  const dispatch = useDispatch();

  const authAccountHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      const response = await fetch(`${config.BACKEND_URL}/account/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const { message, user } = await response.json();
      dispatch(
        login({
          uid: user[0].userId,
          displayName: user[0].displayName,
          photoUrl: user[0].photoUrl,
        })
      );
      await Promise.all([
        setCookie("id", String(user[0].userId), { expires: 1, secure: true }),
        setCookie("displayName", String(user[0].displayName), {
          expires: 1,
          secure: true,
        }),
        setCookie("photoUrl", String(user[0].photoUrl), {
          expires: 1,
          secure: true,
        }),
      ]);
      sweetAlertOfSuccess(message);
    } catch (err: any) {
      console.error(err);
      sweetAlertOfError(err);
    }
  };

  return { authAccountHandler };
};

const useGetCookieToReduxStore = () => {
  const dispatch = useDispatch();
  const getCookie = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      let value = "";
      const arrayCookies = document.cookie.replace(/ /g, "");
      const cookies = arrayCookies.split(";");
      cookies.forEach((cookie) => {
        let keyValue = cookie.split("=");
        if (keyValue[0] === name) {
          value = decodeURIComponent(keyValue[1]);
        }
      });
      resolve(value);
    });
  };

  useEffect(() => {
    (async () => {
      const arrayCookies = await Promise.all([
        getCookie("id"),
        getCookie("displayName"),
        getCookie("photoUrl"),
      ]);
      if (!arrayCookies[0]) {
        return;
      }
      dispatch(
        updateProfile({
          uid: arrayCookies[0],
          displayName: arrayCookies[1],
          photoUrl: arrayCookies[2],
        })
      );
    })();
  }, [dispatch]);
};

export { useAuthAccount, useGetCookieToReduxStore };
