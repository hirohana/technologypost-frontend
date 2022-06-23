import { Link } from "react-router-dom";

import styles from "./Error403.module.scss";
import catImage from "images/error/cat.png";

const Error403 = () => {
  return (
    <div className={styles.container}>
      <h1>403</h1>
      <h3>Forbidden</h3>
      <Link to="/login">ログインページへ</Link>
      <img src={catImage} alt="" />
    </div>
  );
};

export default Error403;
