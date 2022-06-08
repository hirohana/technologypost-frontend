import React from "react";

import AuthGithub from "components/molecules/authGithub/AuthGithub";
import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <DefaultLayout>
      <div>Login</div>
      <AuthGithub />
    </DefaultLayout>
  );
};

export default Login;
