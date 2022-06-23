import React from "react";
import { useDispatch } from "react-redux";

import { config } from "config/applicationConfig";
import { login } from "reducks/user/actionCreator";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";

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
    sweetAlertOfSuccess(message);
  };

  return { authAccountHandler };
};

export { useAuthAccount };
