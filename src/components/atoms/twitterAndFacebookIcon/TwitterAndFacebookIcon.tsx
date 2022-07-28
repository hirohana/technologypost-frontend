import { config } from 'config/applicationConfig';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { selectUser } from 'reducks/user/selectUser';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

import styles from './TwitterAndFacebookIcon.module.scss';

type PROPS = {
  title: string;
  imageUrl: string;
  userName: string;
};

const TwitterAndFacebookIcon = (props: PROPS) => {
  const { title, imageUrl, userName } = props;
  const [url, setUrl] = useState('');
  const { user } = useSelector(selectUser);
  const { id } = useParams();

  useEffect(() => {
    const URL = window.location.href;
    setUrl(URL);
  }, [url]);

  const handleClick = async () => {
    const payload = {
      userName,
      title,
      imageUrl,
      siteUrl: window.location.href,
    };

    try {
      await fetch(`${config.BACKEND_URL}/articles/article/ogp/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err: any) {
      sweetAlertOfError(err);
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <TwitterShareButton
        url={`${url}`}
        // title={title}
        className={styles.icon}
        disabled={!user.displayName}
        onClick={handleClick}
      >
        <TwitterIcon size={30} round />
      </TwitterShareButton>
      <FacebookShareButton
        url={`${url}`}
        // title={title}
        className={styles.icon}
        disabled={!user.displayName}
        onClick={handleClick}
      >
        <FacebookIcon size={30} round />
      </FacebookShareButton>
    </div>
  );
};

export { TwitterAndFacebookIcon };
