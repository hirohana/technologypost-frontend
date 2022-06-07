/* eslint-disable jsx-a11y/anchor-is-valid*/
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import AuthGithub from "./components/molecules/authGithub/AuthGithub";

function App() {
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <AuthGithub />
    </div>
  );
}

export default App;
