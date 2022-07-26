import DOMPurify from 'dompurify';
import marked from 'marked';

import { useArticle } from 'hooks/components/article/useArticle';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import styles from './Article.module.scss';
import 'easymde/dist/easymde.min.css';
import { AvatarImage } from 'components/atoms/button/avatar/AvatarImage';
import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import CategoryIcon from 'components/atoms/categoryIcon/CategoryIcon';
import { Comments } from 'components/molecules/comments/Comments';
import PostComment from 'components/molecules/postComment/PostComment';

const Article = () => {
  const { data } = useArticle();
  const articleData = data?.data[0];

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.article_container}>
          <div className={styles.article_and_comments}>
            {articleData?.article_id && (
              <main>
                <div className={styles.article_header}>
                  <div className={styles.user_informartion}>
                    <AvatarImage src={articleData.user_photo_url} />
                    {articleData.username}
                  </div>
                  <div className={styles.create_date}>
                    <span>投稿日</span>
                    <TimestampProcessing timestamp={articleData.created_at} />
                  </div>
                  <h1 className={styles.title}>{articleData.title}</h1>
                  <CategoryIcon
                    categories={
                      articleData.category_name ? articleData.category_name : ''
                    }
                  />
                </div>

                <div
                  className={styles.container_letter_body}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked(articleData.letter_body)),
                  }}
                ></div>
              </main>
            )}
          </div>
        </div>
        {articleData?.article_id && data?.comments.length !== 0 && (
          <div className={styles.comments_container}>
            <Comments
              photoUrl={articleData.user_photo_url}
              userName={articleData.username}
              comments={data!.comments}
            />
          </div>
        )}
        <div className={styles.post_comment}>
          <PostComment />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Article;
