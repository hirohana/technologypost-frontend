import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateProfile } from "reducks/user/actionCreator";

const useGetCookieToRedux = () => {
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
      const cookie = await Promise.all([
        getCookie("id"),
        getCookie("displayName"),
        getCookie("photoUrl"),
      ]);
      if (!cookie[0]) {
        return;
      }
      dispatch(
        updateProfile({
          uid: cookie[0],
          displayName: cookie[1],
          photoUrl: cookie[2],
        })
      );
    })();
  }, [dispatch]);
};

export { useGetCookieToRedux };
