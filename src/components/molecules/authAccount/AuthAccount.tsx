import React, { useRef } from "react";
import axios from "axios";

const AuthAccount = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authAccountHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    const response = await axios.post(
      `${
        process.env.BACKEND_URL
          ? process.env.BACKEND_URL
          : "http://localhost:5001/account/login"
      }`,
      payload
      // const response = await axios.post(
      //   `${
      //     process.env.BACKEND_URL
      //       ? process.env.BACKEND_URL
      //       : "http://localhost:5000/account/login"
      //   }`,
      //   payload
    );
    console.log(response);
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
