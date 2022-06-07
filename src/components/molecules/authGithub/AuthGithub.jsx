/* eslint-disable jsx-a11y/anchor-is-valid*/
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";

import useAuthGithub from "../../../hooks/components/useAuthGithub";

const AuthGithub = () => {
  const { message, onAuthGitHubHandler } = useAuthGithub();
  return (
    <>
      <a
        onClick={(e) => onAuthGitHubHandler(e)}
        className="btn btn-social btn-github"
      >
        <span className="fa fa-github"></span> Sign in with Github
      </a>
      <p>{message.login}</p>
      <img src={message.avatar_url} alt="" />
    </>
  );
};

export default AuthGithub;
