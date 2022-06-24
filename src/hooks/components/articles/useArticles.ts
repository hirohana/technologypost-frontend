// Articles関連のフック一覧

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
  ARTICLES_DATA_AND_PAGINATION_FOR_USER_ARTICLE_LIST,
} from "types/articles/articles";
import { config } from "config/applicationConfig";
import { useSelector } from "react-redux";
import { selectUser } from "reducks/user/selectUser";

// articlesページ関連のフック。
const useArticles = (resourceUrl: string) => {
  const [data, setData] = useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();

  // 記事検索した際のクエリパラメータkeywordに曖昧一致する記事及び、OFFSET(1ページにおける最大記事数6)
  // を使用してページ毎に取得する。ページリロードした際にデータベースから該当記事一覧を取得するためのフック。
  // Articlesページで使用されている。
  useEffect(() => {
    (async () => {
      try {
        const query = new URLSearchParams(search);
        let keyword = query.get("keyword") || "";
        let page = Number(query.get("page")) || 1;
        setSearchKeyword(keyword);
        const response = await fetch(
          `${config.BACKEND_URL}/${resourceUrl}?keyword=${keyword}&page=${page}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [resourceUrl, search]);

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
    setData,
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
        const data = await fetch(
          `${config.BACKEND_URL}/articles/article/${id}`
        );
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

  /**
   * UserArticleListページへ飛んだ際に、該当ユーザーの記事一覧(下書きも含めてすべて)を
   * DB(articles)から取得するフック。
   */
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${config.BACKEND_URL}/articles/user/article_list?userId=${user.uid}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user.uid]);

  /**
   * 記事データベース(articles)から公開されているユーザー記事を取得し、
   * 引数で受け取ったsetPublicState関数の真偽値を反転する関数。
   */
  // const getPublicArticles = async () => {
  //   try {
  //     const response = await fetch(
  //       `${config.BACKEND_URL}/articles/user/public?userId=${user.uid}&page=${user.uid}`
  //     );
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return { data };
};

export { useArticles, useArticlesById, useUserArticleList };
