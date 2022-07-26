import { Avatar as MuiAvatar } from '@mui/material';

import styles from './AvatarImage.module.scss';

type PROPS = {
  src: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
};

const AvatarImage = (props: PROPS) => {
  const { onClick, src } = props;

  return (
    <MuiAvatar className={styles.tweet_avatar} src={src} onClick={onClick} />
  );
};

export { AvatarImage };
