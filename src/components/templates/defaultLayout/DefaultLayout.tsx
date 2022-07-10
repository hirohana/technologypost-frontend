import { ReactNode } from 'react';

import { useGetCookieToReduxStore } from 'hooks/components/Login/useAuthLoginAndSignUp';
import styles from './DefaultLayout.module.scss';

type PROPS = {
  children: ReactNode;
};

const DefaultLayout = (props: PROPS) => {
  const { children } = props;
  useGetCookieToReduxStore();
  return (
    <>
      <header className={styles.header}>Header</header>
      {children}
      <footer className={styles.footer}>Footer</footer>
    </>
  );
};

export default DefaultLayout;
