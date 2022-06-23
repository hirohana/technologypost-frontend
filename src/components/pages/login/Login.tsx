import React from "react";

import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import styles from "./Login.module.scss";
import AuthAccount from "components/molecules/authAccount/AuthAccount";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <DefaultLayout>
      <main>
        <div>Login</div>
        <Link to="/articles">記事一覧へ</Link>
        <AuthAccount />
      </main>
    </DefaultLayout>
  );
};

export default Login;
