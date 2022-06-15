import React from "react";

import AuthGithub from "components/molecules/authGithub/AuthGithub";
import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import styles from "./Login.module.scss";
import AuthAccount from "components/molecules/authAccount/AuthAccount";

const Login = () => {
  return (
    <DefaultLayout>
      <div>Login</div>
      <AuthAccount />
      <AuthGithub />
    </DefaultLayout>
  );
};

export default Login;
