/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Grid, Container } from "@mui/material";

import { config } from "config/applicationConfig";
import { selectUser } from "reducks/user/selectUser";
import ThreeDotMenu from "components/molecules/threeDotMenu/ThreeDotMenu";
import { trimString } from "utils/trimString/trimString";
import styles from "./UserArticleTitleList.module.scss";
import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";
import TimestampProcessing from "components/atoms/time/timestampProcessing/TimestampProcessing";
import { ARTICLES_DATA_FOR_USER_ARTICLE_LIST } from "types/articles/articles";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";

type ARTICLES_DATA = {
  articlesData: ARTICLES_DATA_FOR_USER_ARTICLE_LIST;
};
const UserArticleTitleList = (props: ARTICLES_DATA) => {
  const { articlesData } = props;
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const trimUserName = trimString(user.displayName);

  const draftBlogJump = (publiState: boolean, draftBlogId: string) => {
    if (publiState) {
      sweetAlertOfError(
        "日記の内容を変更するには公開から非公開に変更してください。"
      );
      return;
    }
    // history.push(`draft/${draftBlogId}`);
  };

  const deleteArticle = async (id: number) => {
    if (!window.confirm("記事を削除してもよろしいですか？")) {
      return;
    }
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/articles/user/public_articles/delete?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const jsonData = await response.json();
      navigate(`/articles/user/${trimUserName}/article_list`);
      sweetAlertOfSuccess(jsonData.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {articlesData.map((articleData, index) =>
              articleData ? (
                <Grid
                  item
                  key={`${articleData.title}${index}`}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Card
                    className={styles.card}
                    onClick={() =>
                      navigate(`/articles/article/${articleData.article_id}`)
                    }
                  >
                    <div className={styles.image_and_delete}>
                      <img
                        src={
                          articleData.article_photo_url
                            ? articleData.article_photo_url
                            : ""
                        }
                        alt=""
                      />
                      <button
                        title="削除"
                        onClick={() => deleteArticle(articleData.article_id)}
                      >
                        ✖
                      </button>
                      <div className={styles.three_dot_menu}>
                        {/* <ThreeDotMenu
                          blankRemovalName={blankRemovalName}
                          category={draftBlogData.category}
                          fileNames={draftBlogData.fileNames}
                          draftBlogId={draftBlogData.draftBlogId}
                          imageDbUrls={draftBlogData.imageDbUrls}
                          likes={draftBlogData.likes}
                          mainWorld={draftBlogData.mainWorld}
                          publicBlogId={draftBlogData.publicBlogId}
                          textArea={draftBlogData.textArea}
                          title={draftBlogData.title}
                          user={user}
                        /> */}
                      </div>
                    </div>
                    <div
                      className={styles.card_container}
                      title="下書きページへ"
                      // onClick={() =>
                      //   draftBlogJump(
                      //     draftBlogData.publicState,
                      //     draftBlogData.draftBlogId
                      //   )
                      // }
                    >
                      <CardContent className={styles.card_content}>
                        <p className={styles.card_title}>
                          タイトル: {articleData.title}
                        </p>
                        {/* <p>カテゴリー: {draftBlogData.category}</p> */}
                        <div className={styles.card_timestamp}>
                          <TimestampProcessing
                            timestamp={articleData.created_at}
                          />
                        </div>
                        <p>
                          {/* {draftBlogData.publicState ? (
                            <span className={styles.public}>公開</span>
                          ) : (
                            <span className={styles.draft}>下書き</span>
                          )} */}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default UserArticleTitleList;
