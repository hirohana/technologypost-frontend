import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { PaginationOutlined } from "components/molecules/pagenation/PaginationOutlined";
import TimestampProcessing from "components/atoms/time/timestampProcessing/TimestampProcessing";
import { useArticlesByCreatedAt } from "hooks/components/articles/useArticlesByCreatedAt";
import styles from "./ArticlesByCreatedAt.module.scss";

const ArticlesByCreatedAt = () => {
  const navigate = useNavigate();
  const { articlesByCreatedAtData, setArticlesByCreatedAtData } =
    useArticlesByCreatedAt();

  return (
    <>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {articlesByCreatedAtData[0] &&
              articlesByCreatedAtData.map((article) => (
                <Grid item key={article.article_id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className={styles.card_container}>
                      <div className={styles.timestamp_likes}>
                        <div className={styles.timestamp}>
                          <TimestampProcessing timestamp={article.created_at} />
                        </div>
                      </div>
                      <div
                        className={styles.image_and_delete}
                        onClick={() =>
                          navigate(`/articles/article/${article.article_id}`)
                        }
                      >
                        <img
                          src={
                            article.article_photo_url
                              ? article.article_photo_url
                              : "https://source.unsplash.com/random"
                          }
                          alt=""
                        />
                      </div>
                      <p>{article.title}</p>
                      <div className={styles.avatar_name}>
                        <Avatar src={article.username} />
                        <div className={styles.createName_mainWorld}>
                          <span>{article.username}</span>
                        </div>
                      </div>
                      <div className={styles.category}>
                        <LocalOfferIcon className={styles.local_offer_icon} />
                        <button
                          className={styles.category_btn}
                          // onClick={() =>
                          //   history.push({
                          //     pathname: `blogs/${article.category}`,
                          //     state: `${article.category}`,
                          //   })
                          // }
                        >
                          <span className={styles.category}>
                            {article.category_name ? article.category_name : ""}
                          </span>
                        </button>
                      </div>
                    </div>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
        <PaginationOutlined
          pageCount={3}
          setData={setArticlesByCreatedAtData}
        />
      </main>
    </>
  );
};

export default ArticlesByCreatedAt;
