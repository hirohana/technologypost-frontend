import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';

import { selectUser } from 'reducks/user/selectUser';
import { UserAvatar } from 'components/atoms/button/userAvatar/UserAvatar';
import { UpdateProfile } from 'components/molecules/updateProfile/UpdateProfile';
import styles from './UserInformation.module.scss';
import { useDeleteAccount } from 'hooks/components/defaultLayout/deleteAccount/useDeleteAccount';

const UserInformation = () => {
  const { user } = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { deleteAccount } = useDeleteAccount();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const modalOpen = () => {
    setOpen(true);
  };
  const modalClose = () => {
    setOpen(false);
  };
  // アカウントのプロフィール関連の情報モーダルを立ち上げるる関数
  const updateProfileInformation = () => {
    modalOpen();
    handleClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <UserAvatar onClick={(e) => handleClick(e)} />
        <div className={styles.profile_block}>
          <span className={styles.profile_user}>ユーザー名</span>
          <span className={styles.profile_name}>
            {user.uid ? user.displayName : '----------'}
          </span>
        </div>
      </div>
      {user.uid ? (
        <>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => updateProfileInformation()}>
              プロフィール編集
            </MenuItem>
            <MenuItem onClick={() => deleteAccount()}>アカウント削除</MenuItem>
          </Menu>
          <UpdateProfile open={open} modalClose={modalClose} />
        </>
      ) : null}
    </div>
  );
};

export { UserInformation };
