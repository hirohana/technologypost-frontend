import { UserAvatar } from 'components/atoms/button/userAvatar/UserAvatar';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <UserAvatar />
        <div className={styles.profile_block}>
          <span className={styles.profile_user}>ユーザー名</span>
          <span className={styles.profile_name}>---------</span>
        </div>
      </div>
    </div>
  );
};

export { UserProfile };
