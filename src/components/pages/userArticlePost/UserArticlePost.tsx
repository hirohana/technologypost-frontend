/* eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import swal from 'sweetalert';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';

import { config } from 'config/applicationConfig';
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
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

const UserArticlePost = () => {
  const [text, setText] = useState('');
  const [textArea, setTextArea] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useSelector(selectUser);
  const { image, setImage, changeImageHandler } = useChangeImageHandler();
  const { data, category } = useUserArticlePost();
  const navigate = useNavigate();
  const { username } = useParams();
  const textRef = useRef(null);
  const textAreaRef = useRef(null);

  // 1. ファイル画像をアップロードした際に発火するイベント。
  // 2. randomChar16メソッドを使って、ランダムな16桁の文字列を生成し、useStateのimageファイル名の文頭に付ける。
  // 3. fireStorageにファイルを保存し、getDownloadURLでURLを取得。
  // 4. URLを`[src=${url}]\n`の中にテンプレートリテラルとして埋め込み、textAreaに上書きする。
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

  // 1. 下書きデータを受け取った際に、letter_bodyにimage画像([]で囲まれたsrc属性から始まるURL)がある場合にそのURLを取り出す。
  // 2. useStateであるimagesに、手としたURLを配列の要素に組み込み、setImagesを使って初期値をセットする。
  useEffect(() => {
    if (!data.data[0]) {
      return;
    }
    const letterBody = data.data[0].letter_body;
    const currentImages = letterBody.match(/https:\/\/.*[\]]/);
    const images = currentImages?.map((image) => image.replace(/\]/, ''));
    console.log(images);
  }, [data]);

  /**
   * 下書きデータをpayloadとして纏めて、データベースに保存する関数
   * @param e
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    swal({
      text: '下書き内容に問題はありませんか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (!willDelete || !user.uid) {
        return;
      }
      const category = onSetCategory();
      const payload = {
        user_id: user.uid,
        title: text,
        letter_body: textArea,
        created_at: new Date().toLocaleString(),
        public: 0,
        category,
      };

      try {
        const response = await fetch(`${config.BACKEND_URL}/articles/draft`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (response.status === 200) {
          navigate(`/articles/user/${user.displayName}/article_list`);
        } else if (response.status === 500) {
          sweetAlertOfError(
            `サーバー側のエラーにより下書きデータが保存されませんでした。\nエラー内容: ${await response.json()}`
          );
        }
      } catch (err: any) {
        sweetAlertOfError(
          `通信エラーが発生し下書きデータが保存されなかった可能性があります。\nエラー内容: ${err}`
        );
      }
    });
  };

  /**
   * 引数で受け取ったfireStorageのurlを加工し、textAreaに上書きする関数
   * @param url
   */
  const insertTextAreaWithdownloadURL = (url: string) => {
    const imgURL = `[src=${url}]\n`;
    let str = textArea;
    setTextArea(str + imgURL);
  };

  /**
   * 選択されたカテゴリーを、categoryArrayの配列にプッシュし返却する関数
   * @returns
   */
  const onSetCategory = (): {
    id: string;
    name: string;
  }[] => {
    const selectedCategoryArray = selectedCategory.trim().split(' ');
    const categoryArray = [];
    for (const category of selectedCategoryArray) {
      const arry = category.split('.');
      const obj = {
        id: arry[0],
        name: arry[1],
      };
      categoryArray.push(obj);
    }
    return categoryArray;
  };

  return (
    <>
      {user.displayName === username ? (
        <main className={styles.global_container}>
          <div className={styles.container}>
            {category.length !== 0 && (
              <>
                <TemporarilyImageToFireStorage
                  fileNames={fileNames}
                  images={images}
                  setFileNames={setFileNames}
                  setImages={setImages}
                  textArea={textArea}
                  setTextArea={setTextArea}
                />
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className={styles.container_main}>
                    <ImageIcon image={image} onChange={changeImageHandler} />
                    <TextField
                      variant="outlined"
                      fullWidth
                      required
                      multiline={true}
                      label="タイトル(必須)"
                      className={styles.textfiled}
                      defaultValue={data.data[0] ? data.data[0].title : ''}
                      ref={textRef}
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
                      defaultValue={
                        data.data[0] ? data.data[0].letter_body : ''
                      }
                      ref={textAreaRef}
                    />
                    <SelectPulldown
                      menus={category}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                    <div className={styles.create_date}>
                      <div className={styles.timestamp}>
                        作成日 &nbsp;
                        <TimestampProcessing
                          timestamp={new Date().toISOString()}
                        />
                      </div>
                      作成者 &nbsp;{user.displayName}
                    </div>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={!text || !textArea || !selectedCategory.length}
                      className={
                        !text || !textArea || !selectedCategory.length
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
        </main>
      ) : (
        <Error403 />
      )}
    </>
  );
};

export default UserArticlePost;
