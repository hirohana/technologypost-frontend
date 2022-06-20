import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { config } from "config/applicationConfig";
import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textField/TextField";
import { useArticlesById } from "hooks/components/articles/useArticlesById";
import { PaginationOutlined } from "components/molecules/pagination/PaginationOutlined";
import styles from "./ArticlesCards.module.scss";

export type ARTICLES_DATA = {
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

export type ARTICLES_DATA_AND_PAGINATION = {
  data: ARTICLES_DATA;
  pagination: {
    totalPages: number;
    paginationMaxCount: number;
  };
};

const Articles = () => {
  const [articlesByCreatedAtData, setArticlesByCreatedAtData] =
    useState<ARTICLES_DATA_AND_PAGINATION>();
  const [searchWords, setSearchWords] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();

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

  const getArticlesBySearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/articles/search?keyword=${searchWords}`);
    const response = await fetch(
      `${config.BACKEND_URL}/articles/search?keyword=${searchWords}`
    );
    const data = await response.json();
    setArticlesByCreatedAtData(data);
  };

  return (
    <main>
      <div className={styles.container}>
        <TextField
          values={searchWords}
          changeValues={setSearchWords}
          onSubmitHandler={getArticlesBySearch}
        />
        {articlesByCreatedAtData?.data ? (
          <>
            <ArticlesCards data={articlesByCreatedAtData.data} />
            <PaginationOutlined
              maxPage={articlesByCreatedAtData.pagination.paginationMaxCount}
              setData={setArticlesByCreatedAtData}
            />
          </>
        ) : null}
      </div>
    </main>
  );
};

export default Articles;
