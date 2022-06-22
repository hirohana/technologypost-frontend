import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { login } from "reducks/user/actionCreator";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";

const AuthAccount = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const authAccountHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    const response = await fetch("http://localhost:5000/account/login", {
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
        uid: user[0].id,
        displayName: user[0].displayName,
        photoUrl: user[0].photoUrl,
      })
    );
    sweetAlertOfSuccess(message);
  };

  return (
    <form onSubmit={(e) => authAccountHandler(e)}>
      <input
        type="email"
        placeholder="email"
        name="email"
        ref={emailRef}
        required
      ></input>
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={passwordRef}
        required
      ></input>
      <button>ログイン認証</button>
    </form>
  );
};

export default AuthAccount;
