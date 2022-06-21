import React from "react";
import { useNavigate } from "react-router-dom";

import { config } from "config/applicationConfig";

const usePagination = () => {
  const navigate = useNavigate();

  const changeCurrentPage = async (
    event: React.ChangeEvent<unknown>,
    page: number,
    setData: any
  ) => {
    event.preventDefault();
    try {
      navigate(`/articles/?page=${page}`);
      const response = await fetch(
        `${config.BACKEND_URL}/articles/?page=${page}`
      );
      setData(await response.json());
    } catch (err) {
      console.error(err);
    }
  };

  const changeCurrentSearchPage = async (
    event: React.ChangeEvent<unknown>,
    page: number,
    queryKeyword: string,
    setData: any
  ) => {
    event.preventDefault();

    try {
      navigate(`/articles/search?keyword=${queryKeyword}&page=${page}`);
    } catch (err) {
      console.error(err);
    }
  };

  return { changeCurrentPage, changeCurrentSearchPage };
};

export { usePagination };
