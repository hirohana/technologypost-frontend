import { FC, ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";
type PROPS = {
  children?: ReactNode;
};

const DefaultLayout = (props: PROPS) => {
  const { children } = props;
  return (
    <>
      <header className={styles.header}>Header</header>
      {children}
      <footer className={styles.footer}>Footer</footer>
    </>
  );
};

export default DefaultLayout;
