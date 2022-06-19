import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { ARTICLES_DATA } from "hooks/components/articles/useArticlesByCreatedAt";
import TimestampProcessing from "components/atoms/time/timestampProcessing/TimestampProcessing";
import styles from "./ArticlesCards.module.scss";

const ArticlesCards = (props: { data: ARTICLES_DATA }) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <>
      <main>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {data[0] &&
              data.map((article) => (
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
      </main>
    </>
  );
};

export default ArticlesCards;
