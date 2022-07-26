import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ARTICLE_DATA_AND_COMMENTS } from 'types/articles/articles';
import { config } from 'config/applicationConfig';

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

export { useArticle };
