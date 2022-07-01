// Articles関連のフック一覧

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
  ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST,
  ARTICLE_DATA_FOR_USER_ARTICLE_LIST,
} from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

// articlesページ関連のフック。
const useArticles = () => {
  const [data, setData] = useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { search } = useLocation();
  const navigate = useNavigate();

  // 記事検索した際のクエリパラメータkeywordに曖昧一致する記事及び、OFFSET(1ページにおける最大記事数6)
  // を使用してページ毎に取得する。ページリロードした際にデータベースから該当記事一覧を取得するためのフック。
  // Articlesページで使用されている。
  useEffect(() => {
    (async () => {
      try {
        const query = new URLSearchParams(search);
        let keyword = query.get('keyword') || '';
        let page = Number(query.get('page')) || 1;
        setSearchKeyword(keyword);
        const response = await fetch(
          `${config.BACKEND_URL}/articles/page/${page}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search]);

  // 記事検索した際のクエリパラメータkeywordに曖昧一致した記事を取得する。
  // 最新記事から6記事取得。Articlesページで使用されている。
  const getArticles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/articles/search?keyword=${searchKeyword}`);
  };

  // 記事検索した際のクエリパラメータkeyword及び、該当ページであるpageと一致した記事を取得する。
  // moleculesのpaginationで使用されている。
  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      navigate(`/articles/search?keyword=${searchKeyword}`);
      const response = await fetch(
        `${config.BACKEND_URL}/articles/search?keyword=${searchKeyword}`
      );
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data,
    searchKeyword,
    setSearchKeyword,
    getArticles,
    getArticlesBySearch,
  };
};

/**
 * URLパラメータのidと一致する記事を取得するフック。
 * Articlesから該当idに一致するページへ飛ぶ際に使用されている。
 * @returns {ARTICLE_DATA | undefined}
 */
const useArticlesById = () => {
  const [data, setData] = useState<ARTICLE_DATA>();
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
// {
//   article_id: null,
//   article_photo_url: null,
//   created_at: null,
//   letter_body: null,
//   public: null,
//   title: null,
//   user_id: null,
//   user_photo_url: null,
//   username: null,
// }
// UserArticlePostページで使用するフック。
const useUserArticlePost = () => {
  const [data, setData] = useState<
    [
      ARTICLE_DATA_FOR_USER_ARTICLE_LIST,
      { category: { id: number; name: string }[] }
    ]
  >([
    {
      article_id: null,
      article_photo_url: null,
      created_at: null,
      letter_body: null,
      public: null,
      title: null,
      user_id: null,
      user_photo_url: null,
      username: null,
    },
    { category: [] },
  ]);
  const { user } = useSelector(selectUser);
  const { article_id } = useParams();

  useEffect(() => {
    (async () => {
      // 記事データベース(articles)からユーザーの下書き記事データを取得する関数
      const draftArticlesData = async () => {
        const response = await fetch(
          `${config.BACKEND_URL}/articles/${article_id}/draft`
        );
        const jsonData = await response.json();
        return jsonData;
      };

      // カテゴリーデータベース(category)からカテゴリー一覧全て取得するAPI
      const categoryData = async () => {
        const response = await fetch(`${config.BACKEND_URL}/articles/category`);
        const jsonData = await response.json();
        return jsonData;
      };

      try {
        const data = await Promise.all([draftArticlesData(), categoryData()]);
        setData(data);
      } catch (err: any) {
        sweetAlertOfError(err);
      }
    })();
  }, [user.uid, article_id]);

  return { data, setData };
};

export { useArticles, useArticlesById, useUserArticleList, useUserArticlePost };
