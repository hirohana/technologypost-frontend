// Articles関連のフック一覧

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
} from 'types/articles/articles';
import { config } from 'config/applicationConfig';

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
        setData(jsonData);
        func(false);
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

export { useArticles, useArticlesById };
