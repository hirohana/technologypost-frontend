import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import swal from 'sweetalert';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';

import { useUserArticlePost } from 'hooks/components/articles/useArticles';
import { TemporarilyImageToFireStorage } from 'components/molecules/TemporarilyImageToFireStorage/TemporarilyImageToFireStorage';
import { useChangeImageHandler } from 'hooks/components/changeImage/useChangeImage';
import Error403 from 'components/pages/error/error403/Error403';
import ImageIcon from 'components/atoms/button/imageIcon/ImageIcon';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import styles from './UserArticlePost.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { randomChar16 } from 'utils/randomChar16/randomChar16';
import { trimString } from 'utils/trimString/trimString';
import { SelectPulldown } from 'components/molecules/selectPulldown/SelectPulldown';

const UserArticlePost = () => {
  const [text, setText] = useState('');
  const [textArea, setTextArea] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<{ id: number; name: string }[]>([]);
  const { user } = useSelector(selectUser);
  const { image, setImage, changeImageHandler } = useChangeImageHandler();
  const { data } = useUserArticlePost();

  useEffect(() => {
    let newFileNames = fileNames;
    let newImages = images;

    if (image === null) {
      return;
    }
    const randomChar = randomChar16();
    const fileName = randomChar + '_' + image.name;
    const trimName = trimString(user.displayName);
    newFileNames.push(fileName);
    setFileNames(newFileNames);

    // 3. 上記のファイル名を使用してstorageにファイル情報を保存。
    const storageRef = ref(
      storage,
      `articleImages/${trimName}/articleImage/${fileName}`
    );
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          insertTextAreaWithdownloadURL(downloadURL);
          newImages.push(downloadURL);
          setImages(newImages);
        });
      }
    );
  }, [image]);

  const insertTextAreaWithdownloadURL = (url: string) => {
    const imgURL = `[src=${url}]\n`;
    let str = textArea;
    setTextArea(str + imgURL);
  };

  const handleSubmit = () => {
    swal({
      text: '下書き内容に問題はありませんか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete || !user.uid) {
        return;
      }
      const payload = {
        user_id: user.uid,
        title: text,
        letter_body: textArea,
        created_at: new Date(),
        public: 0,
      };
    });
  };

  console.log(category);

  return (
    <main className={styles.global_container}>
      {user.uid ? (
        <div className={styles.container}>
          {data[0].article_id ? (
            <div>true</div>
          ) : (
            <>
              <TemporarilyImageToFireStorage
                fileNames={fileNames}
                images={images}
                setFileNames={setFileNames}
                setImages={setImages}
                textArea={textArea}
                setTextArea={setTextArea}
              />
              <form onSubmit={handleSubmit}>
                <div className={styles.container_main}>
                  <ImageIcon image={image} onChange={changeImageHandler} />
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    multiline={true}
                    label="タイトル(必須)"
                    className={styles.textfiled}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    multiline={true}
                    rows={20}
                    label="本文(必須)"
                    autoFocus
                    className={styles.textfiled}
                    value={textArea}
                    onChange={(e) => setTextArea(e.target.value)}
                  />
                  <SelectPulldown setCategory={setCategory} menus={data[1]} />
                  <div className={styles.create_date}>
                    <div className={styles.timestamp}>
                      作成日 &nbsp;
                      <TimestampProcessing
                        timestamp={
                          data[0].created_at
                            ? data[0].created_at
                            : new Date().toISOString()
                        }
                      />
                    </div>
                    作成者 &nbsp;{user.displayName}
                  </div>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={!text || !textArea || !category.length}
                    className={
                      !text || !textArea || !category.length
                        ? styles.send_disable_btn
                        : styles.send_btn
                    }
                  >
                    下書き保存
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <Error403 />
      )}
    </main>
  );
};

export default UserArticlePost;
