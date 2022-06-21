import { useArticlesById } from "hooks/components/articles/useArticles";
import styles from "./Article.module.scss";

const Article = () => {
  const { data } = useArticlesById();

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.article}>{data?.data[0].article_id}</div>
      </div>
      <div className={styles.comment}>
        {data?.comments.map((comment) => (
          <>
            <img src={comment.user_photo_url} alt="" />
            <span>{comment.username}</span>
          </>
        ))}
      </div>
    </main>
  );
};

export default Article;
