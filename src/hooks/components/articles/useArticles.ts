// Articles関連のフック一覧

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
  ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST,
  DRAFT_ARTICLE_DATA_FOR_USER_ARTICLE_LIST,
} from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';

// articlesページのフック。
const useArticles = (func: any) => {
  const [data, setData] = useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  let page = Number(query.get('page')) || 1;
  const keyword = String(query.get('keyword')) || '';
  const navigate = useNavigate();

  // 記事検索した際のクエリパラメータkeywordに曖昧一致する記事及び、OFFSET(1ページにおける最大記事数6)
  // を使用してページ毎に取得する。ページリロードした際にデータベースから該当記事一覧を取得するためのフック。
  // Articlesページで使用されている。
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${config.BACKEND_URL}/articles/page/${page}`
        );
        const jsonData = await response.json();
        console.log(jsonData);
        // setData(jsonData);
        // func(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page]);

  // 記事検索した際のクエリパラメータkeyword及び、該当ページであるpageと一致した記事を取得する。
  // moleculesのpaginationで使用されている。
  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      navigate(`/articles?keyword=${searchKeyword}`);
      const response = await fetch(
        `${config.BACKEND_URL}/articles/search?keyword=${searchKeyword}`
      );
      const data = await response.json();
      setData(data);
      func(false);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    keyword,
    data,
    searchKeyword,
    setSearchKeyword,
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

// UserArticlePostページで使用するフック。
const useUserArticlePost = () => {
  const [data, setData] = useState<{
    data: DRAFT_ARTICLE_DATA_FOR_USER_ARTICLE_LIST[];
    categories: { id: number; name: string }[];
  }>({ data: [], categories: [] });
  const [category, setCategory] = useState([]);
  const { id } = useParams();

  // URLパラメータから記事IDを取得できれば、つまりarticlesに下書きデータが存在すれば
  // ↓のuseEffectを実行。
  useEffect(() => {
    if (!id) {
      return;
    }
    (async () => {
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
      const data = await draftArticlesData();

      // カテゴリーデータベース(category)からカテゴリー一覧全て取得する関数
      const categoryData = async () => {
        try {
          const response = await fetch(
            `${config.BACKEND_URL}/articles/category`
          );
          const category = await response.json();
          return category;
        } catch (err) {
          console.error(err);
        }
      };

      const category = await categoryData();
      setData(data);
      setCategory(category);
    })();
  }, []);

  // URLパラメータから記事IDを取得できなければ、つまりarticlesに下書きデータが存在しない場合
  // ↓のuseEffectを実行。
  useEffect(() => {
    if (id) {
      return;
    }

    (async () => {
      // カテゴリーデータベース(category)からカテゴリー一覧全て取得する関数
      const categoryData = async () => {
        try {
          const response = await fetch(
            `${config.BACKEND_URL}/articles/category`
          );
          const category = await response.json();
          return category;
        } catch (err) {
          console.error(err);
        }
      };
      const category = await categoryData();
      setData(data);
      setCategory(category);
    })();
  }, []);

  return { data, setData, category };
};

export { useArticles, useArticlesById, useUserArticleList, useUserArticlePost };
