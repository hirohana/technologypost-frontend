import styles from "./ThreeDot.module.scss";

type PROPS = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ThreeDot = (props: PROPS) => {
  return (
    <button onClick={props.onClick} className={styles.three_dot}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default ThreeDot;
