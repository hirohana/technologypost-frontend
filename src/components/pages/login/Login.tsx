import React from "react";

import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import styles from "./Login.module.scss";
import AuthAccount from "components/molecules/authAccount/AuthAccount";

const Login = () => {
  return (
    <DefaultLayout>
      <main>
        <div>Login</div>
        <AuthAccount />
      </main>
    </DefaultLayout>
  );
};

export default Login;
