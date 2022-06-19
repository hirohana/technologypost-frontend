import { useState } from "react";

import { useArticlesByCreatedAt } from "./useArticlesByCreatedAt";
import { config } from "config/applicationConfig";

const useArticlesBySearch = () => {
  const [searchWords, setSearchWords] = useState("");
  const { setArticlesByCreatedAtData } = useArticlesByCreatedAt();

  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${config.BACKEND_URL}/articles/search?keyword=${searchWords}`
    );
    const data = await response.json();
    setArticlesByCreatedAtData(data);
  };

  return { searchWords, setSearchWords, getArticlesBySearch };
};

export { useArticlesBySearch };
