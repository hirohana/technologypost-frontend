/* eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SimpleMde from 'react-simplemde-editor';
import DOMPurify from 'dompurify';
import marked from 'marked';
import { Button, TextField } from '@mui/material';
import swal from 'sweetalert';
import 'easymde/dist/easymde.min.css';
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
import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

let articleIdOfFireStorage = randomChar16();
const UserArticlePost = () => {
  const [unmounted, setUnmounted] = useState(false);
  const [text, setText] = useState('');
  const [markdownValue, setMarkdownValue] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useSelector(selectUser);
  const { image, setImage, changeImageHandler } = useChangeImageHandler();
  const { data, category } = useUserArticlePost();
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    return () => {
      if (!unmounted) {
        return;
      }
      console.log('終了');
    };
  }, [unmounted]);

  // 1. ファイル画像をアップロードした際に発火する副作用。
  // 2. randomChar16メソッドを使って、ランダムな16桁の文字列を生成し、useStateのimageファイル名の文頭に付ける。
  // 3. fireStorageのdraftImagesディレクトリ配下にファイルを保存し、getDownloadURLでURLを取得。
  // 4. URLを`![image](${image})`の中にテンプレートリテラルとして埋め込み、markdownValueに上書きする。
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
      `articleImages/${articleIdOfFireStorage}/${trimName}/${fileName}`
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
          setMarkdownValue((preMarkdownValue) => {
            return preMarkdownValue + `![image](${downloadURL})\n`;
          });
          newImages.push(downloadURL);
          setImages(newImages);
        });
      }
    );
  }, [image]);

  // 1. 下書きデータがある場合に、useStateであるtext及びtextAreaにtitleとletter_bodyをセット
  // 2. categoriesからforEachを使い取り出したcategory.idとcategory.nameを各々連結させて、最後にselectedCategoryにセット。
  // 3. letter_bodyにimage画像([]で囲まれたsrc属性から始まるURL)がある場合にそのURLを取り出す。
  //    useStateであるimagesに、手としたURLを配列の要素に組み込み、setImagesを使って初期値をセットする。
  useEffect(() => {
    if (!data.data[0]) {
      return;
    }

    const draftData = data.data[0];

    setText(draftData.title);
    setMarkdownValue(draftData.letter_body);

    let str = '';
    data.categories.forEach((category) => {
      str += `${category.id}.${category.name} `;
    });
    setSelectedCategory(str);

    // 画像ファイルがfireStorageに保存されていない場合、処理を進めないようにするための条件分岐。
    if (
      !draftData.file_names ||
      !draftData.article_id_of_storage ||
      !draftData.images_url
    ) {
      return;
    }
    articleIdOfFireStorage = draftData.article_id_of_storage;
    const currentFileNames = draftData.file_names.split(',');
    const currentImages = draftData.images_url?.split(',');
    setFileNames(currentFileNames);
    setImages(currentImages);
  }, [data]);

  /**
   * 1. fireStorageのarticlesディレクトリ配下にファイルを保存。
   * 2. 下書きデータをpayloadとして纏めてデータベースに保存。
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

      setUnmounted(true);
      const category = onSetCategory();

      const stringImages = images.reduce(
        (prev, current) => (prev += `,${current}`)
      );
      const stringFileNames = fileNames.reduce(
        (prev, current) => (prev += `,${current}`)
      );

      const payload = {
        user_id: user.uid,
        title: text,
        letter_body: markdownValue,
        created_at: new Date().toLocaleString(),
        public: 0,
        articleIdOfStorage: articleIdOfFireStorage,
        fileNames: stringFileNames,
        imagesUrl: stringImages,
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

  const onMarkdownChange = (value: string) => {
    setMarkdownValue(value);
  };

  return (
    <DefaultLayout>
      <>
        {user.displayName === username ? (
          <main className={styles.global_container}>
            <div className={styles.container}>
              {category.length !== 0 && (
                <>
                  <TemporarilyImageToFireStorage
                    articleIdOfFireStorage={articleIdOfFireStorage}
                    fileNames={fileNames}
                    images={images}
                    setFileNames={setFileNames}
                    setImages={setImages}
                    markdownValue={markdownValue}
                    setMarkdownValue={setMarkdownValue}
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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />

                      <SelectPulldown
                        menus={category}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                      />

                      <SimpleMde
                        value={markdownValue}
                        onChange={onMarkdownChange}
                      />
                      <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(marked(markdownValue)),
                          }}
                        ></div>
                      </div>
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
                        disabled={
                          !text || !markdownValue || !selectedCategory.length
                        }
                        className={
                          !text || !markdownValue || !selectedCategory.length
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
    </DefaultLayout>
  );
};

export default UserArticlePost;
