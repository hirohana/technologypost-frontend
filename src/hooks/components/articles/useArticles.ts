import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ARTICLES_DATA_AND_PAGINATION } from "components/types/articles/articles";
import { config } from "config/applicationConfig";

const useArticles = (resourceUrl: string) => {
  const [data, setData] = useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const query = new URLSearchParams(search);
        let keyword = query.get("keyword") || "";
        let page = Number(query.get("page")) || 1;
        setSearchKeyword(keyword);
        setSearchPage(page);
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
    navigate(`/articles/search?keyword=${searchKeyword}&page=${searchPage}`);
  };

  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/articles/search?keyword=${searchKeyword}&page=${searchPage}`);
    const response = await fetch(
      `${config.BACKEND_URL}/articles/search?keyword=${searchKeyword}&page=${searchPage}`
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

export { useArticles };
