import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { config } from "config/applicationConfig";

type ARTICLES_DATA = {
  username: string;
  user_photo_url: string;
  user_id: number;
  title: string;
  letter_body: string;
  created_at: string;
  article_id: number;
  article_photo_url: null | string;
  category_name: null | string;
  comment: null | string;
  comment_created_at: null | string;
}[];

type ARTICLES_DATA_AND_PAGINATION = {
  data: ARTICLES_DATA;
  pagination: {
    totalPages: number;
    paginationMaxCount: number;
  };
};

const useArticlesByCreatedAt = () => {
  const [articlesByCreatedAtData, setArticlesByCreatedAtData] =
    useState<ARTICLES_DATA_AND_PAGINATION>();
  const { search } = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const query = new URLSearchParams(search);
        const response = await fetch(
          `${config.BACKEND_URL}/articles/?page=${
            query.get("page") ? query.get("page") : 1
          }`
        );
        const jsonData = await response.json();
        setArticlesByCreatedAtData(jsonData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  console.log(articlesByCreatedAtData);
  return { articlesByCreatedAtData, setArticlesByCreatedAtData };
};

export { useArticlesByCreatedAt };
export type { ARTICLES_DATA, ARTICLES_DATA_AND_PAGINATION };
