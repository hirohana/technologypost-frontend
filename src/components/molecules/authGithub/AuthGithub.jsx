/* eslint-disable jsx-a11y/anchor-is-valid*/
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";

import { logout } from "reducks/user/actionCreator";
import { deleteAllCookies } from "utils/deleteAllCookies/deleteAllCookies";
import useAuthGithub from "../../../hooks/components/useAuthGithub";

const AuthGithub = () => {
  const { message, setMessage, onAuthGitHubHandler } = useAuthGithub();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(user);
  }, [user, setMessage]);

  const logoutFromGitHub = () => {
    dispatch(logout());
    deleteAllCookies();
  };

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
      <button onClick={logoutFromGitHub}>GitHubアカウントからログアウト</button>
    </>
  );
};

export default AuthGithub;
