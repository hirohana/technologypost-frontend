import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import MediaQuery from 'react-responsive';
import swal from 'sweetalert';

import { selectUser } from 'reducks/user/selectUser';
import { UserAvatar } from 'components/atoms/button/userAvatar/UserAvatar';
import styles from './UserAuthAndProfile.module.scss';
import sweetAlertOfSuccess from 'utils/sweetAlert/sweetAlertOfSuccess';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import UpdateProfile from 'components/molecules/updateProfile/UpdateProfile';

const UserInformation = () => {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  // アカウントを削除する関数
  // 1. firestoreのmembersコレクションから該当のfileNameの値を取り出す。
  // 2. membersコレクションからユーザーを削除。
  // 3. firebaseのstorageから該当するfileNameのプロフィール画像を削除。
  // 4. authenticationからユーザーを削除。
  const deleteAccount = async () => {
    const user = auth.currentUser;
    swal({
      text: 'アカウントを削除してもよろしいですか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (!willDelete) {
        return;
      }

      const membersDelete = async () => {
        const blankRemovalName = user?.displayName?.replace(/\s+/g, '');
        const docRef = db.collection('members').doc(blankRemovalName);
        const fileName = await docRef
          .get()
          .then((snapshot) => {
            return snapshot.data()?.fileName;
          })
          .catch((err) => console.log(err));

        await docRef
          .delete()
          .catch((err) =>
            sweetAlertOfError(
              `エラーが発生してアカウントが削除されなかった可能性があります。エラー内容: ${err}`
            )
          );
        await storage
          .ref(`avatars/${fileName}`)
          .delete()
          .catch((err) =>
            sweetAlertOfError(
              `エラーが発生してプロフィール画像が削除されなかった可能性があります。エラー内容: ${err}`
            )
          )
          .finally(() =>
            user
              ?.delete()
              .then(() => {
                sweetAlertOfSuccess('アカウント削除に成功しました!');
              })
              .catch((err) => {
                sweetAlertOfError(
                  `エラーが発生してアカウント削除に失敗しました。エラー内容: ${err}`
                );
              })
          );
      };

      membersDelete();
    });
  };

  // アカウントのプロフィール関連の情報モーダルを立ち上げるる関数
  const updateProfileInformation = () => {
    modalOpen();
    handleClose();
  };

  return (
    <>
      {user.uid ? (
        <>
          <MediaQuery query="(max-width: 600px)">
            <div className={styles.container}>
              <div
                className={styles.profile_container}
                title={user.displayName}
              >
                <UserAvatar onClick={(e) => handleClick(e)} />
              </div>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => updateProfileInformation()}>
                  プロフィール編集
                </MenuItem>
                <MenuItem onClick={() => deleteAccount()}>
                  アカウント削除
                </MenuItem>
              </Menu>
              <UpdateProfile open={open} modalClose={modalClose} />
            </div>
          </MediaQuery>
          <MediaQuery query="(min-width: 600px)">
            <div className={styles.container}>
              <div
                className={styles.profile_container}
                title={user.displayName}
              >
                <UserAvatar onClick={(e) => handleClick(e)} />
                <div className={styles.profile_block}>
                  <p className={styles.profile_user}>ユーザー名</p>
                  <p className={styles.profile_name}>{user.displayName}</p>
                </div>
              </div>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => updateProfileInformation()}>
                  プロフィール編集
                </MenuItem>
                <MenuItem onClick={() => deleteAccount()}>
                  アカウント削除
                </MenuItem>
              </Menu>
              <UpdateProfile open={open} modalClose={modalClose} />
            </div>
          </MediaQuery>
        </>
      ) : (
        <>
          <MediaQuery query="(max-width: 600px)">
            <div className={styles.container}>
              <div className={styles.profile_container} title="unknown">
                <AccountCircleIcon
                  fontSize="large"
                  className={styles.login_addicon}
                />
              </div>
            </div>
          </MediaQuery>
          <MediaQuery query="(min-width: 600px)">
            <div className={styles.container}>
              <div className={styles.profile_container} title="unknown">
                <AccountCircleIcon
                  fontSize="large"
                  className={styles.login_addicon}
                />
                <div className={styles.profile_block}>
                  <p className={styles.profile_user}>ユーザー名</p>
                  <p className={styles.profile_name}>unknown</p>
                </div>
              </div>
            </div>
          </MediaQuery>
        </>
      )}
    </>
  );
};

export { UserInformation };
