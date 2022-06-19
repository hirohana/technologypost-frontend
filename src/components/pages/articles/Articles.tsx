import React, { useEffect } from "react";

import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textInput/TextField";
import { useArticlesById } from "hooks/components/articles/useArticlesById";
import { PaginationOutlined } from "components/molecules/pagenation/PaginationOutlined";
import { useArticlesByCreatedAt } from "hooks/components/articles/useArticlesByCreatedAt";
import styles from "./ArticlesCards.module.scss";

const Articles = () => {
  const { articleIdData, getArticlesById } = useArticlesById();
  const { articlesByCreatedAtData, setArticlesByCreatedAtData } =
    useArticlesByCreatedAt();

  return (
    <main>
      <div className={styles.container}>
        <TextField />
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
