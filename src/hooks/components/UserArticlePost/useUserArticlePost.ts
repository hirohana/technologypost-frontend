import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'easymde/dist/easymde.min.css';

import { DRAFT_ARTICLE_DATA_FOR_USER_ARTICLE_LIST } from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { useChangeImageHandler } from 'hooks/components/changeImage/useChangeImage';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { randomChar16 } from 'utils/randomChar16/randomChar16';
import { trimString } from 'utils/trimString/trimString';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

// UserArticlePostページで使用するフック。
const useUserArticlePost = () => {
  const [data, setData] = useState<{
    data: DRAFT_ARTICLE_DATA_FOR_USER_ARTICLE_LIST[];
    categories: { id: number; name: string }[];
  }>({ data: [], categories: [] });
  const [category, setCategory] = useState([]);
  const [isDraftData, setIsDraftData] = useState(false);
  const [fireStorageId, setFireStorageId] = useState('');
  const [text, setText] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useSelector(selectUser);
  const { image, setImage, changeImageHandler } = useChangeImageHandler();
  const navigate = useNavigate();
  const { username, id } = useParams();
  const trimUserName = trimString(user.displayName);
  const [markdownValue, setMarkdownValue] = useState('');

  // URLパラメータから記事IDを取得できれば、つまりarticlesに下書きデータが存在すれば
  // ↓のuseEffectを実行。
  useEffect(() => {
    (async () => {
      const data = await draftArticlesData();
      const category = await categoryData();
      setData(data);
      setCategory(category);
    })();
  }, []);

  // 1. ファイル画像をアップロードした際に発火する副作用。
  // 2. randomChar16メソッドを使って、ランダムな16桁の文字列を生成し、useStateのimageファイル名の文頭に付ける。
  // 3. fireStorageのdraftImagesディレクトリ配下にファイルを保存し、getDownloadURLでURLを取得。
  // 4. URLを`![image](${image})`の中にテンプレートリテラルとして埋め込み、markdownValueに上書きする。
  useEffect(() => {
    let newFileNames = [...fileNames];
    let newImages = [...images];

    if (image === null) {
      return;
    }

    const randomChar = randomChar16();
    const fileName = randomChar + '_' + image.name;
    const trimName = trimString(user.displayName);
    newFileNames.push(fileName);
    setFileNames(newFileNames);

    // 初回fireStorageにファイル画像を保存する際にrandomChar16関数を使用し、ストレージ用のIDを取得。
    let newFireStorageId = '';
    if (!fireStorageId) {
      newFireStorageId = randomChar16();
      setFireStorageId(newFireStorageId);
    }

    // useStateの更新関数で値を更新した場合、即座に反映されないので、初回だけは下記のnewStroageUrlの値を
    // 使用し、storageRefのディレクトリ名に充てる。
    const storageRef = ref(
      storage,
      fireStorageId
        ? `articleImages/${fireStorageId}/${trimName}/${fileName}`
        : `articleImages/${newFireStorageId}/${trimName}/${fileName}`
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
      !draftData.article_id_storage ||
      !draftData.images_url
    ) {
      return;
    }
    const currentFileNames = draftData.file_names.split(',');
    const currentImages = draftData.images_url?.split(',');
    setFireStorageId(draftData.article_id_storage);
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

      // サーバーに下書きデータを送るための前処理。
      const category = onSetCategory();
      const stringImages = images.reduce(
        (prev, current) => (prev += `,${current}`)
      );
      const stringFileNames = fileNames.reduce(
        (prev, current) => (prev += `,${current}`)
      );

      const payload = {
        userId: user.uid,
        title: text,
        letterBody: markdownValue,
        createdAt: new Date().toLocaleString(),
        public: 0,
        articleIdOfStorage: fireStorageId,
        fileNames: stringFileNames,
        imagesUrl: stringImages,
        category,
      };

      try {
        // URLパラメータから記事IDを取得できない場合、つまり下書きデータがデータベースに存在しない場合の処理。
        let response: Response;
        if (!id) {
          response = await fetch(`${config.BACKEND_URL}/articles/draft`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          // URLパラメータから記事IDを取得できる場合、つまり下書きデータがデータベースに存在する場合の処理。
        } else {
          response = await fetch(`${config.BACKEND_URL}/articles/draft/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        }

        if (response.status === 200) {
          setIsDraftData(true);
          navigate(`/articles/user/${trimUserName}/article_list`);
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

  // カテゴリーデータベース(category)からカテゴリー一覧全て取得する関数
  const categoryData = async () => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/articles/category`);
      const category = await response.json();
      return category;
    } catch (err) {
      console.error(err);
    }
  };

  // 1. 記事IDをパラメータから取得し、該当する下書き記事データを記事データベース(articles)から取得する関数
  // 2. 記事IDをパラメータから取得し、articlesとcategoryの中間テーブルであるarticles_categoryから
  //    記事IDに登録されているカテゴリーIDを取得する関数
  const draftArticlesData = async () => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/articles/draft/${id}`
      );
      const draftData = await response.json();
      return draftData;
    } catch (err) {
      console.error(err);
    }
  };

  const onMarkdownChange = (value: string) => {
    setMarkdownValue(value);
  };

  return {
    data,
    setData,
    category,
    handleSubmit,
    fireStorageId,
    fileNames,
    images,
    setFileNames,
    setImages,
    text,
    setText,
    selectedCategory,
    setSelectedCategory,
    onMarkdownChange,
    setMarkdownValue,
    markdownValue,
  };
};

export { useUserArticlePost };
