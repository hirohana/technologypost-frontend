import styles from "./Error404.module.scss";
import catImage from "images/error/cat.png";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h4>File not found</h4>
      <img src={catImage} alt="" />
    </div>
  );
};

export default Error404;
