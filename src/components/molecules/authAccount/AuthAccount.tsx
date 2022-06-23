import { useRef } from "react";
import { useAuthAccount } from "hooks/components/authAccount/useAuthAccount";

const AuthAccount = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { authAccountHandler } = useAuthAccount(emailRef, passwordRef);
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
