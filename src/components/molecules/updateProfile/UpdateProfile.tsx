import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { ref, deleteObject, listAll } from 'firebase/storage';

// import ImageIconChoiceOnemore from 'components/atoms/button/imageIconChoiceOnemore/ImageIconChoiceOnemore';
import { storage } from '../../../firebase';
import { useChangeImageHandler } from 'hooks/components/changeImage/useChangeImage';
import { randomChar16 } from 'utils/randomChar16/randomChar16';
import { selectUser } from 'reducks/user/selectUser';
import ProfileImage from 'components/atoms/image/profileImage/ProfileImage';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import styles from './UpdateProfile.module.scss';
import { trimString } from 'utils/trimString/trimString';
const trimUserName = trimString(user.displayName);
type PROPS = {
  open: boolean;
  modalClose: () => void;
};

const UpdateProfile = (props: PROPS) => {
  const { open, modalClose } = props;
  const [profileImage, setProfileImage] = useState<string | null>('');
  const [fileName, setFileName] = useState('');
  const { image, setImage, changeImageHandler } = useChangeImageHandler();
  const { user } = useSelector(selectUser);

  /* 1. ファイル画像をアップロードした際に発火するuseEffect(発火イベントの関数はchangeImageHandler)
     2. firebaseのstorageに16桁のランダムな文字列を生成するメソッド(randomchar16)を使用してファイル名を作成。
     3. 上記のファイル名を使用してstorageにファイル情報を保存。
     4. storageで使用できるgetDownloadURLを使ってURLを取得してからsetProfileImageのstate変更関数に代入。
  */
  // useEffect(() => {
  //   if (image === null) {
  //     return;
  //   }
  //   const randomChar = randomChar16();
  //   const fileName = randomChar + '_' + image.name;
  //   setFileName(fileName);
  //   const blankRemovalName = user.displayName.replace(/\s+/g, '');
  //   // 3. 上記のファイル名を使用してstorageにファイル情報を保存。
  //   const uploadImg = storage
  //     .ref(`avatars/${blankRemovalName}/${fileName}`)
  //     .put(image);
  //   setImage(null);
  //   uploadImg.on(
  //     firebase.storage.TaskEvent.STATE_CHANGED,
  //     () => {
  //       //何もしない
  //     },
  //     (err) => {
  //       alert(err.message);
  //     },
  //     // 4. storageで使用できるgetDownloadURLを使ってURLを取得してからDBに保存。
  //     async () => {
  //       await storage
  //         .ref(`avatars/${blankRemovalName}`)
  //         .child(fileName)
  //         .getDownloadURL()
  //         .then(async (url) => {
  //           setProfileImage(url);
  //         });
  //     }
  //   );
  // }, [image]);

  // firebaseのstorageから該当するfileNameを削除する関数。
  const imageDelete = async (fileName: string) => {
    try {
      const storageRef = ref(storage, `userProfileImages/${trimUserName}/`);
      const listResult = await listAll(storageRef);
      listResult.items.forEach(async (item) => await deleteObject(item));
      setProfileImage(null);
    } catch (err: any) {
      sweetAlertOfError(
        `エラーが発生してファイル画像が削除されなかった可能性があります。エラー内容: ${err}`
      );
    }
  };

  const onClickCancel = () => {
    if (!profileImage) {
      modalClose();
      return;
    }
    imageDelete(fileName);
    modalClose();
  };

  const onClickSave = async () => {
    if (!profileImage) {
      modalClose();
      return;
    }

    const getAndDeleteFileName = async () => {};

    const updateProfileImage = async () => {
      const user = auth.currentUser;
      await user
        ?.updateProfile({
          photoURL: profileImage,
        })
        .catch((err) =>
          sweetAlertOfError(
            `エラーが発生して前のプロフィール画像が更新されなかった可能性があります。エラー内容: ${err}`
          )
        );
    };

    // Promise.all([getAndDeleteFileName(), updateProfileImage()])
    //   .catch((err) =>
    //     sweetAlertOfError(
    //       `何らかのエラーが発生してプロフィール画像が更新されなかった可能性があります。エラー内容: ${err}`
    //     )
    //   )
    //   .finally(() => {
    //     modalClose();
    //     window.location.reload();
    //   });
  };

  return (
    <div>
      <Dialog open={open}>
        <div className={styles.profile_image}>
          <ProfileImage
            profileImage={profileImage}
            fileName={fileName}
            imageDelete={imageDelete}
          />

          <ImageIconChoiceOnemore
            image={profileImage}
            onChange={changeImageHandler}
          />
          <DialogTitle>プロフィール画像変更</DialogTitle>
        </div>
        <DialogActions>
          <Button
            onClick={onClickCancel}
            color="primary"
            className={styles.primary_btn}
          >
            キャンセル
          </Button>
          <Button
            onClick={onClickSave}
            color="primary"
            className={styles.primary_btn}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
