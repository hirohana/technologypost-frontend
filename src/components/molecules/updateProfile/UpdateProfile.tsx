import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import {
  ref,
  deleteObject,
  listAll,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

// import ImageIconChoiceOnemore from 'components/atoms/button/imageIconChoiceOnemore/ImageIconChoiceOnemore';
import { storage } from '../../../firebase';
import { useChangeImageHandler } from 'hooks/components/changeImage/useChangeImage';
import { selectUser } from 'reducks/user/selectUser';
import ProfileImage from 'components/atoms/image/profileImage/ProfileImage';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import { trimString } from 'utils/trimString/trimString';
import { config } from 'config/applicationConfig';
import sweetAlertOfSuccess from 'utils/sweetAlert/sweetAlertOfSuccess';
import styles from './UpdateProfile.module.scss';
import { updateProfile } from 'reducks/user/actionCreator';

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
  const trimUserName = trimString(user.displayName);
  const dispatch = useDispatch();

  // firebaseのstorageから該当するfileNameを削除する関数。
  const imageDelete = async () => {
    try {
      const storageRef = ref(storage, `userProfileImages/${trimUserName}/`);
      const listResult = await listAll(storageRef);
      listResult.items.forEach(async (item) => await deleteObject(item));
      setProfileImage(null);
      return storageRef;
    } catch (err: any) {
      sweetAlertOfError(
        `エラーが発生してファイル画像が削除されなかった可能性があります。エラー内容: ${err}`
      );
    }
  };

  // 1. firebaseのstorageにある既存のプロフィール画像ファイルを削除。
  // 2. プロフィール画像をアップロードした画像に変更するためにfirebaseのstorageに保存。
  // 3. データベース(users)のprofile_urlに上記で取得した絶対URLパスで更新。
  // 4. Reduxのstoreのユーザー情報を更新。
  useEffect(() => {
    if (image === null) {
      return;
    }
    (async () => {
      try {
        const storageRef = await imageDelete();
        if (storageRef === undefined) {
          return;
        }
        const uploadTask = uploadBytesResumable(storageRef, image);
        setImage(null);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const updateDatabase = async () => {
                  const payload = {
                    userId: user.uid,
                    photoUrl: downloadURL,
                  };
                  try {
                    const response = await fetch(
                      `${config.BACKEND_URL}/account/user/photo_url`,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                      }
                    );
                    const { message } = await response.json();
                    sweetAlertOfSuccess(message);
                  } catch (err: any) {
                    sweetAlertOfError(
                      `エラーが発生し、プロフィール画像が更新されなかった可能性があります。エラー内容: ${err}`
                    );
                  }
                };

                const updateReduxStoreOfUser = async () => {
                  dispatch(
                    updateProfile({
                      uid: user.uid,
                      displayName: user.displayName,
                      photoUrl: downloadURL,
                    })
                  );
                };

                try {
                  await Promise.all([
                    updateDatabase(),
                    updateReduxStoreOfUser(),
                  ]);
                } catch (err) {
                  sweetAlertOfError(
                    `エラーが発生し、プロフィール画像が更新されなかった可能性があります。エラー内容: ${err}`
                  );
                }
              }
            );
          }
        );
      } catch (err) {
        sweetAlertOfError(
          `エラーが発生し、プロフィール画像が更新されなかった可能性があります。エラー内容: ${err}`
        );
        console.error(err);
      } finally {
        modalClose();
        window.location.reload();
      }
    })();
  }, [image]);

  // const onClickCancel = () => {
  //   if (!profileImage) {
  //     modalClose();
  //     return;
  //   }
  //   imageDelete();
  //   modalClose();
  // };

  // const onClickSave = async () => {
  //   if (!profileImage) {
  //     modalClose();
  //     return;
  //   }

  //   const getAndDeleteFileName = async () => {
  //     try {
  //       await imageDelete();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const updateProfileImage = async () => {
  //     const user = auth.currentUser;
  //     await user
  //       ?.updateProfile({
  //         photoURL: profileImage,
  //       })
  //       .catch((err) =>
  //         sweetAlertOfError(
  //           `エラーが発生して前のプロフィール画像が更新されなかった可能性があります。エラー内容: ${err}`
  //         )
  //       );
  //   };
  // };

  return (
    <div>
      <Dialog open={open}>
        <div className={styles.profile_image}>
          <ProfileImage
            profileImage={profileImage}
            fileName={fileName}
            imageDelete={imageDelete}
          />

          {/* <ImageIconChoiceOnemore
            image={profileImage}
            onChange={changeImageHandler}
          /> */}
          <DialogTitle>プロフィール画像変更</DialogTitle>
        </div>
        <DialogActions>
          <Button
            // onClick={onClickCancel}
            color="primary"
            className={styles.primary_btn}
          >
            キャンセル
          </Button>
          <Button
            // onClick={onClickSave}
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

export { UpdateProfile };
