import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateProfile } from "reducks/user/actionCreator";
import styles from "./DefaultLayout.module.scss";

type PROPS = {
  children: ReactNode;
};

const DefaultLayout = (props: PROPS) => {
  const { children } = props;
  const dispatch = useDispatch();

  const getCookie = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      let value = "";
      const arrayCookies = document.cookie.replace(/ /g, "");
      const cookies = arrayCookies.split(";");
      cookies.forEach((cookie) => {
        let keyValue = cookie.split("=");
        if (keyValue[0] === name) {
          value = decodeURIComponent(keyValue[1]);
        }
      });
      resolve(value);
    });
  };

  useEffect(() => {
    (async () => {
      const arry = await Promise.all([
        getCookie("id"),
        getCookie("displayName"),
        getCookie("photoUrl"),
      ]);
      if (!arry[0]) {
        return;
      }
      dispatch(
        updateProfile({
          uid: arry[0],
          displayName: arry[1],
          photoUrl: arry[2],
        })
      );
    })();
  }, []);
  return (
    <>
      <header className={styles.header}>Header</header>
      {children}
      <footer className={styles.footer}>Footer</footer>
    </>
  );
};

export default DefaultLayout;
