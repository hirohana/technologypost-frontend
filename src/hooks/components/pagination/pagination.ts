import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUser } from "reducks/user/selectUser";
import { config } from "config/applicationConfig";

const usePagination = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);
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
    queryKeyword: string
  ) => {
    event.preventDefault();
    navigate(`/articles/search?keyword=${queryKeyword}&page=${page}`);
  };

  const changeUserCurrentPage = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    event.preventDefault();
    navigate(`/articles/?userId=${user.uid}&page=${page}`);
  };

  return { changeCurrentPage, changeCurrentSearchPage, changeUserCurrentPage };
};

export { usePagination };
