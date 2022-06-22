import styles from "./Error403.module.scss";
import catImage from "images/error/cat.png";

const Error403 = () => {
  return (
    <div className={styles.container}>
      <h1>403</h1>
      <h4>Forbidden</h4>
      <img src={catImage} alt="" />
    </div>
  );
};

export default Error403;
