import React, { useRef } from "react";
import axios from "axios";

const AuthAccount = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const authAccountHandler = async (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await fetch("http://localhost:5000/account/login", {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
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
