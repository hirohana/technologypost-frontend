import { useState } from "react";

import { config } from "config/applicationConfig";

const useArticlesById = () => {
  const [articleIdData, setArticleIdData] = useState();
  const getArticlesById = async (id: number) => {
    try {
      const response = await fetch(`${config.BACKEND_URL}/articles/${id}`);
      const jsonData = await response.json();
      setArticleIdData(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  return { articleIdData, getArticlesById };
};

export { useArticlesById };
