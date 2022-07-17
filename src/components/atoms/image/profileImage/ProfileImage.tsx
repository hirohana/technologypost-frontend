import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from './ProfileImage.module.scss';

import { selectUser } from 'reducks/user/selectUser';

type PROPS = {
  profileImage: string | null;
  fileName: string;
  imageDelete: any;
};

const ProfileImage = (props: PROPS) => {
  const { profileImage, fileName, imageDelete } = props;
  const { user } = useSelector(selectUser);

  return (
    <div className={styles.container}>
      {profileImage ? (
        <button
          onClick={() => imageDelete(fileName)}
          className={styles.delete_btn}
        >
          ✖
        </button>
      ) : null}
      <Avatar
        src={profileImage ? profileImage : user.photoUrl}
        className={styles.avatar}
      />
    </div>
  );
};

export default ProfileImage;
