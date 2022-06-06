import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  const onAuthGitHubHandler = () => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <button onClick={() => onAuthGitHubHandler()}>GitHubログイン認証</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
