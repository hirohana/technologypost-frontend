import DOMPurify from "dompurify";
import marked from "marked";

import {
  useArticle,
  useSubmitComment,
} from "hooks/components/article/useArticle";
import TimestampProcessing from "components/atoms/timestampProcessing/TimestampProcessing";
import styles from "./Article.module.scss";
import "easymde/dist/easymde.min.css";
import { AvatarImage } from "components/atoms/button/avatar/AvatarImage";
import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import CategoryIcon from "components/atoms/categoryIcon/CategoryIcon";
import { Comments } from "components/organisms/comments/Comments";
import PostComment from "components/molecules/postComment/PostComment";
import { TwitterAndFacebookIcon } from "components/atoms/twitterAndFacebookIcon/TwitterAndFacebookIcon";
import { useIsLoading } from "hooks/redux/isLoading/useIsLoading";
import { LoadingIcon } from "components/atoms/loadingIcon/LoadingIcon";

const Article = () => {
  const { data, imagesArray } = useArticle();
  const { isLoading } = useIsLoading();
  const articleData = data?.data[0];
  const { submitComment, text, setText } = useSubmitComment();

  if (!isLoading) {
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
                        articleData.category_name
                          ? articleData.category_name
                          : ""
                      }
                    />
                  </div>

                  <div
                    className={styles.container_letter_body}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked(articleData.letter_body)
                      ),
                    }}
                  ></div>
                  <TwitterAndFacebookIcon
                    title={articleData.title}
                    imageUrl={imagesArray[0]}
                    userName={articleData.username}
                    letterBody={DOMPurify.sanitize(
                      marked(articleData.letter_body)
                    )}
                  />
                </main>
              )}
            </div>
          </div>
          {articleData?.article_id && data?.comments.length !== 0 ? (
            <div className={styles.comments_container}>
              <Comments comments={data!.comments} />
            </div>
          ) : (
            <div className={styles.no_comments_container}>
              <p className={styles.no_comment}>
                現在コメントは投稿されていません。
              </p>
            </div>
          )}
          <div className={styles.post_comment}>
            <PostComment
              text={text}
              setText={setText}
              onSubmit={submitComment}
            />
          </div>
        </div>
      </DefaultLayout>
    );
  } else {
    return (
      <DefaultLayout>
        <LoadingIcon />
      </DefaultLayout>
    );
  }
};

export default Article;
