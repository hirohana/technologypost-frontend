import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ARTICLE_DATA_AND_COMMENTS } from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

/**
 * URLパラメータのidと一致する記事を取得するフック。
 * Articlesから該当idに一致するページへ飛ぶ際に使用されている。
 * @returns {ARTICLE_DATA_AND_COMMENTS | undefined}
 */
const useArticle = () => {
  const [data, setData] = useState<ARTICLE_DATA_AND_COMMENTS | undefined>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`${config.BACKEND_URL}/articles/${id}`);
        const jsonData = await data.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  return { data };
};

/**
 * コメントをサーバー側へ送信するためのフック。
 */
const useSubmitComment = () => {
  const [text, setText] = useState('');
  const { id } = useParams();
  const { user } = useSelector(selectUser);

  const submitComment = async () => {
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
    } catch (err: any) {
      sweetAlertOfError(err);
      console.error(err);
    }
  };

  return { submitComment, text, setText };
};

export { useArticle, useSubmitComment };
