// Articles関連のフック一覧

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { isLoading } from 'reducks/loading/actionCreator';
import { ARTICLES_DATA_AND_PAGINATION } from 'types/articles/articles';
import { config } from 'config/applicationConfig';
import { useDispatch } from 'react-redux';

// articlesページのフック。
const useArticles = () => {
  const [data, setData] = useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { search } = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(search);
  let page = Number(query.get('page')) || 1;
  const keyword = String(query.get('keyword')) || '';
  const navigate = useNavigate();

  // 記事検索した際のクエリパラメータkeywordに曖昧一致する記事及び、OFFSET(1ページにおける最大記事数6)
  // を使用してページ毎に取得する。ページリロードした際にデータベースから該当記事一覧を取得するためのフック。
  // Articlesページで使用されている。
  useEffect(() => {
    (async () => {
      dispatch(isLoading(true));
      try {
        const response = await fetch(
          `${config.BACKEND_URL}/articles/page/${page}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        dispatch(isLoading(false));
      } catch (err) {
        dispatch(isLoading(false));
        console.error(err);
      }
    })();
  }, [page]);

  // 記事検索した際のクエリパラメータkeyword及び、該当ページであるpageと一致した記事を取得する。
  // moleculesのpaginationで使用されている。
  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(isLoading(true));
    try {
      navigate(`/?keyword=${searchKeyword}`);
      const response = await fetch(
        `${config.BACKEND_URL}/articles/search?keyword=${searchKeyword}`
      );
      const data = await response.json();
      setData(data);
      dispatch(isLoading(false));
    } catch (err) {
      dispatch(isLoading(false));
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

export { useArticles };
