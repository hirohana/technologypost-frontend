import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ARTICLE_DATA_AND_COMMENTS } from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import { isLoading } from 'reducks/loading/actionCreator';
import { useDispatch } from 'react-redux';

/**
 * URLパラメータのidと一致する記事を取得するフック。
 * Articlesから該当idに一致するページへ飛ぶ際に使用されている。
 * @returns {ARTICLE_DATA_AND_COMMENTS | undefined}
 */
const useArticle = () => {
  const [data, setData] = useState<ARTICLE_DATA_AND_COMMENTS | undefined>();
  const [imagesArray, setImagesArray] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      dispatch(isLoading(true));
      try {
        const data = await fetch(`${config.BACKEND_URL}/articles/${id}`);
        const jsonData: ARTICLE_DATA_AND_COMMENTS = await data.json();
        if (jsonData.data[0]?.images_url) {
          const newImagesArray = jsonData.data[0].images_url.split(',');
          setImagesArray(newImagesArray);
        }
        setData(jsonData);
        dispatch(isLoading(false));
      } catch (err) {
        dispatch(isLoading(false));
        console.error(err);
      }
    })();
  }, [id]);

  return { data, imagesArray };
};

/**
 * コメントをサーバー側へ送信するためのフック。
 */
const useSubmitComment = () => {
  const [text, setText] = useState('');
  const { id } = useParams();
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const submitComment = async () => {
    dispatch(isLoading(true));
    const payload = {
      articleId: id,
      userId: user.uid,
      comment: text,
    };

    try {
      await fetch(`${config.BACKEND_URL}/articles/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setText('');
      dispatch(isLoading(false));
      window.location.reload();
    } catch (err: any) {
      dispatch(isLoading(false));
      sweetAlertOfError(err);
      console.error(err);
    }
  };

  return { submitComment, text, setText };
};

export { useArticle, useSubmitComment };
