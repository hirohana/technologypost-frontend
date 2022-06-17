import React from "react";

import ArticlesByCreatedAt from "components/organisms/articlesByCreatedAt/articlesByCreatedAt";
import TextField from "components/molecules/textInput/TextField";
import { useArticlesById } from "hooks/components/articles/useArticlesById";
import styles from "./Article.module.scss";

const Articles = () => {
  const { articleIdData, getArticlesById } = useArticlesById();

  return (
    <main>
      <div className={styles.container}>
        <TextField />
        <ArticlesByCreatedAt />
      </div>
    </main>
  );
};

export default Articles;
