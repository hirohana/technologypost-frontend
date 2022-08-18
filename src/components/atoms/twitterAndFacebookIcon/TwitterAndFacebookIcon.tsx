import { config } from "config/applicationConfig";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { selectUser } from "reducks/user/selectUser";
import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";

import styles from "./TwitterAndFacebookIcon.module.scss";

type PROPS = {
  title: string;
  imageUrl: string;
  userName: string;
  letterBody: string;
};

const TwitterAndFacebookIcon = (props: PROPS) => {
  const { title, imageUrl, userName, letterBody } = props;
  const [url, setUrl] = useState("");
  const { user } = useSelector(selectUser);
  const { id } = useParams();

  useEffect(() => {
    const URL = window.location.href;
    setUrl(URL);
  }, [url]);

  useEffect(() => {
    document
      .querySelector('meta[property="og:title"]')!
      .setAttribute("content", title);
  }, [title]);

  return (
    <>
      <div className={styles.container}>
        <a
          href={`http://twitter.com/share?url=${url}&text=${title}&via=${userName}`}
          className={styles.btn_tw}
        >
          Tweets
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          // charset="utf-8"
        ></script>
      </div>
    </>
  );
};

export { TwitterAndFacebookIcon };
