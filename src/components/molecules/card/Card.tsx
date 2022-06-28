import { useNavigate } from "react-router-dom";
import MuiCard from "@mui/material/Card";
import { Avatar } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Grid from "@mui/material/Grid";

import { ARTICLES_DATA } from "types/articles/articles";
import TimestampProcessing from "components/atoms/timestampProcessing/TimestampProcessing";
import styles from "./Card.module.scss";

const Card = (props: { data: ARTICLES_DATA }) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <>
      {data.map((article) => (
        <Grid item key={article.article_id} xs={12} sm={6} md={4}>
          <MuiCard
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
          </MuiCard>
        </Grid>
      ))}
    </>
  );
};

export { Card };
