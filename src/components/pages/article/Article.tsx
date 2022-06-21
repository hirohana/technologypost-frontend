import { useArticlesById } from "hooks/components/articles/useArticles";
import styles from "./Article.module.scss";

const Article = () => {
  const { data } = useArticlesById();
  return (
    <main>
      <div className={styles.container}>{data?.article_id}</div>
    </main>
  );
};

export default Article;
