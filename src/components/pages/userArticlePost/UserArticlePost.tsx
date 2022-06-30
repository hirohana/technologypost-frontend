import { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import { storage } from '../../../firebase';

import { useUserArticlePost } from 'hooks/components/articles/useArticles';
// import { SaveTemporarilyImageToFireStorage } from "components/molecules/saveTemporarilyImageToFireStorage/SaveTemporarilyImageToFireStorage";
import { useChangeImageHandler } from 'hooks/components/useChangeImage/useChangeImage';
import Error403 from 'components/pages/error/error403/Error403';
import ImageIcon from 'components/atoms/button/imageIcon/ImageIcon';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import styles from './UserArticlePost.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { randomChar16 } from 'utils/randomChar16/randomChar16';
import { trimString } from 'utils/trimString/trimString';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

const UserArticlePost = () => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState('');
  const [textArea, setTextArea] = useState<string>('');
  const { user } = useSelector(selectUser);
  const { image, setImage, changeImageHandler } = useChangeImageHandler();
  const { data } = useUserArticlePost();

  useEffect(() => {
    if (image === null) {
      return;
    }
    const randomChar = randomChar16();
    const fileName = randomChar + '_' + image.name;
    const trimName = trimString(user.displayName);

    // 3. 上記のファイル名を使用してstorageにファイル情報を保存。
    const uploadImg = storage
      .ref(`articleImages/${trimName}/articleImage/${fileName}`)
      .put(image);
    setImage(null);
    uploadImg.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        //何もしない
      },
      (err) => {
        alert(err.message);
      },
      // 4. storageで使用できるgetDownloadURLを使ってURLを取得。
      async () => {
        await storage
          .ref(`blogImages/${trimName}/articleImage`)
          .child(fileName)
          .getDownloadURL()
          .then(async (url) => {
            // changeInputTextArea(url);
            console.log(url);
          })
          .catch((err) => sweetAlertOfError(err));
      }
    );
  }, [image]);

  const handleSubmit = () => {
    swal({
      text: '送信内容に問題はありませんか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete) {
        return;
      }
      // const text = data.text;
      // const title = data.title;
      // const category = data.category;
      // const username = blankRemovalName;
      // const userUd = id.id;
    });
  };

  const changeInputTextArea = (url: string) => {
    let str = textArea;
    setTextArea(str + url);
  };

  return (
    <main>
      {user.uid ? (
        <div className={styles.container}>
          {data.article_id ? (
            // <form onSubmit={handleSubmit}>
            //   <div className={styles.container_main}>
            //     <ImageIcon image={image} onChange={changeImageHandler} />
            //     <TextField
            //       variant="outlined"
            //       fullWidth
            //       required
            //       multiline={true}
            //       label="タイトル(必須)"
            //       defaultValue={data.title}
            //       className={styles.textfiled}
            //     />

            // <TextField
            //   variant="outlined"
            //   margin="normal"
            //   fullWidth
            //   required
            //   multiline={true}
            //   rows={10}
            //   label="本文(必須)"
            //   autoFocus
            //   defaultValue={data.letter_body}
            //   className={styles.textfiled}
            // />
            //     <div className={styles.create_date}>
            //       <div className={styles.timestamp}>
            //         作成日 &nbsp;
            //         <TimestampProcessing
            //           timestamp={
            //             data.created_at
            //               ? data.created_at
            //               : new Date().toISOString()
            //           }
            //         />
            //       </div>
            //       作成者 &nbsp;{data.username}
            //     </div>
            //     <Button
            //       fullWidth
            //       variant="contained"
            //       type="submit"
            //       // disabled={errors.title && true}
            //       // className={
            //       //   errors.title && true
            //       //     ? styles.sendDisableBtn
            //       //     : styles.sendBtn
            //       // }
            //     >
            //       下書き保存
            //     </Button>
            //   </div>
            // </form>
            <div>true</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.container_main}>
                <ImageIcon image={image} onChange={changeImageHandler} />
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  multiline={true}
                  label="タイトル(必須)"
                  // defaultValue={data.title}
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
                  // defaultValue={data.letter_body}
                  className={styles.textfiled}
                  value={textArea}
                  onChange={(e) => setTextArea(e.target.value)}
                />
                <div className={styles.create_date}>
                  <div className={styles.timestamp}>
                    作成日 &nbsp;
                    <TimestampProcessing
                      timestamp={
                        data.created_at
                          ? data.created_at
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
                  // disabled={errors.title && true}
                  // className={
                  //   errors.title && true
                  //     ? styles.sendDisableBtn
                  //     : styles.sendBtn
                  // }
                >
                  下書き保存
                </Button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <Error403 />
      )}
    </main>
  );
};

export default UserArticlePost;
