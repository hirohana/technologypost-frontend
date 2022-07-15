import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import { deleteObject, listAll, ref } from 'firebase/storage';
import swal from 'sweetalert';

import { storage } from '../../../firebase';
import { selectUser } from 'reducks/user/selectUser';
import sweetAlertOfSuccess from 'utils/sweetAlert/sweetAlertOfSuccess';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import { UserAvatar } from 'components/atoms/button/userAvatar/UserAvatar';
import { UpdateProfile } from 'components/molecules/updateProfile/UpdateProfile';
import { trimString } from 'utils/trimString/trimString';
import { config } from 'config/applicationConfig';
import { logout } from 'reducks/user/actionCreator';
import { deleteAllCookies } from 'utils/deleteAllCookies/deleteAllCookies';
import styles from './UserInformation.module.scss';

const UserInformation = () => {
  const { user } = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const trimUserName = trimString(user.displayName);
  const dispatch = useDispatch();

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

  // アカウントを削除する関数
  // 1. firebaseのstorageからユーザーのプロフィール画像を削除(imageDelete)
  // 2. ユーザー情報が格納されているデータベース(users)からユーザー情報を削除。
  // 3. Reduxのstore、cookieに登録されているユーザー情報を削除。
  // 4. 上記の処理をPromise.allで纏めて処理を行う。
  const deleteAccount = async () => {
    swal({
      text: 'アカウントを削除してもよろしいですか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (!willDelete) {
        return;
      }

      /**
       * storageからプロフィール画像を削除する関数
       */
      const deleteImage = async () => {
        try {
          const storageRef = ref(storage, `userProfileImages/${trimUserName}/`);
          const listResult = await listAll(storageRef);
          listResult.items.forEach(async (item) => await deleteObject(item));
        } catch (err: any) {
          sweetAlertOfError(
            `エラーが発生してファイル画像が削除されなかった可能性があります。エラー内容: ${err}`
          );
        }
      };

      /**
       * データベースからユーザー情報を削除
       */
      const deleteDatabaseUsers = async () => {
        const payload = {
          userId: user.uid,
        };
        try {
          await fetch(`${config.BACKEND_URL}/account`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        } catch (err: any) {
          console.error(err);
          sweetAlertOfError(
            `エラーが発生してアカウント削除に失敗した可能性があります。エラー内容: ${err}`
          );
        }
      };

      /**
       * store、cookieのユーザー情報を削除
       */
      const deleteStoreAndCookie = async () => {
        dispatch(logout());
        deleteAllCookies();
      };

      // 上記3つの処理をPromise.allで非同期の並行処理
      try {
        await Promise.all([
          deleteImage(),
          deleteDatabaseUsers(),
          deleteStoreAndCookie(),
        ]);
        sweetAlertOfSuccess(`アカウントが削除されました。`);
      } catch (err) {
        console.error(err);
        sweetAlertOfError(
          `エラーが発生してアカウント削除に失敗した可能性があります。エラー内容: ${err}`
        );
      }
    });
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
