/* eslint-disable jsx-a11y/anchor-is-valid*/
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";

import useAuthGithub from "../../../hooks/components/useAuthGithub";

const AuthGithub = () => {
  const { message, setMessage, onAuthGitHubHandler } = useAuthGithub();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    setMessage(user);
  }, [user, setMessage]);

  return (
    <>
      <a
        onClick={(e) => onAuthGitHubHandler(e)}
        className="btn btn-social btn-github"
      >
        <span className="fa fa-github"></span> Sign in with Github
      </a>
      <p>{message.displayName}</p>
      <img src={message.photoUrl} alt="" />
    </>
  );
};

export default AuthGithub;
