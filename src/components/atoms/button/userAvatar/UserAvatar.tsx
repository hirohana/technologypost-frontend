import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';

import { Avatar } from '@mui/material';
import styles from './UserAvatar.module.scss';

type PROPS = {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
};

const UserAvatar = (props: PROPS) => {
  const { onClick } = props;
  const { user } = useSelector(selectUser);
  return (
    <Avatar
      className={styles.tweet_avatar}
      src={user.photoUrl}
      onClick={onClick}
    />
  );
};

export { UserAvatar };
