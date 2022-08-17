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
};

const TwitterAndFacebookIcon = (props: PROPS) => {
  const { title, imageUrl, userName } = props;
  const [url, setUrl] = useState("");
  const { user } = useSelector(selectUser);
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <a
        href="http://twitter.com/share?url=https://naomi-osaka.studio.design&text=Congratulations,
      Naomi Osaka!&hashtags=withSTUDIO"
        target="_blank"
        rel="noreferrer"
      >
        ツイート
      </a>
    </div>
  );
};

export { TwitterAndFacebookIcon };
