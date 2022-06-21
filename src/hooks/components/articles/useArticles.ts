import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  ARTICLES_DATA_AND_PAGINATION,
  ARTICLE_DATA,
} from "types/articles/articles";
import { config } from "config/applicationConfig";

const useArticles = (resourceUrl: string) => {
  const [data, setData] = useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();

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

  const getArticles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/articles/search?keyword=${searchKeyword}`);
  };

  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/articles/search?keyword=${searchKeyword}`);
    const response = await fetch(
      `${config.BACKEND_URL}/articles/search?keyword=${searchKeyword}`
    );
    const data = await response.json();
    setData(data);
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

export { useArticles, useArticlesById };
