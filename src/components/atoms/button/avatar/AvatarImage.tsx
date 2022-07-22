import { Avatar as MuiAvatar } from '@mui/material';

import styles from './AvatarImage.module.scss';

type PROPS = {
  url: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
};

const AvatarImage = (props: PROPS) => {
  const { onClick, url } = props;

  return (
    <MuiAvatar className={styles.tweet_avatar} src={url} onClick={onClick} />
  );
};

export { AvatarImage };
