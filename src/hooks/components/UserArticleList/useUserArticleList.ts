import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST } from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { trimString } from 'utils/trimString/trimString';

// UserArticleListページで使用するフック
const useUserArticleList = () => {
  const [data, setData] =
    useState<ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST>();
  const { user } = useSelector(selectUser);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const page = query.get('page');

  /**
   * UserArticleListページへ飛んだ際に、該当ユーザーの記事一覧(下書きも含めてすべて)を
   * DB(articles)から取得するフック。
   */
  useEffect(() => {
    (async () => {
      try {
        // ユーザー情報をReduxStoreから取得する際にデータが取れなければfetchを行わせない為の条件分岐
        if (!user.uid) {
          return;
        }
        const response = await fetch(
          `${config.BACKEND_URL}/articles/page/${page}/users/${user.uid}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user.uid, page]);

  return { data };
};
// UserArticleList配下のCardsInformation.tsxで使用。
// UserArticlePostにページ遷移した際に、空の下書きデータをデータベースに保存し、記事IDを返す関数。
// ユーザーが記事新規作成を押した際に、空の下書きデータを作成する関数。
const useDraftInitialDataSet = () => {
  const { user } = useSelector(selectUser);
  const trimUserName = trimString(user.displayName);
  const navigate = useNavigate();

  const draftInitialDataSet = async () => {
    const payload = {
      userId: user.uid,
    };
    try {
      const response = await fetch(`${config.BACKEND_URL}/articles/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const jsonData = await response.json();
      const id = jsonData.id;
      navigate(`/user/${trimUserName}/article_post/${id}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return { draftInitialDataSet };
};

export { useUserArticleList, useDraftInitialDataSet };
