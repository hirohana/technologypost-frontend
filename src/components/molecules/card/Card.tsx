import { useNavigate } from 'react-router-dom';
import MuiCard from '@mui/material/Card';
import { Avatar } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Grid from '@mui/material/Grid';

import { ARTICLES_DATA } from 'types/articles/articles';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import styles from './Card.module.scss';

const Card = (props: { data: ARTICLES_DATA }) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <>
      {data.map((article) => (
        <Grid item key={article.article_id} xs={12} sm={6} md={4}>
          <MuiCard
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
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
                      : 'https://source.unsplash.com/random'
                  }
                  alt=""
                />
              </div>
              <p className={styles.title}>{article.title}</p>
              <div className={styles.avatar_name}>
                <Avatar
                  src={article.user_photo_url}
                  className={styles.avatar_url}
                />
                <span>{article.username}</span>
              </div>
              <div className={styles.category}>
                <div className={styles.category_icon_container}>
                  <LocalOfferIcon className={styles.category_icon} />
                </div>
                <div className={styles.category_name_container}>
                  <p className={styles.category_name}>
                    {article.category_name}
                  </p>
                </div>
              </div>
            </div>
          </MuiCard>
        </Grid>
      ))}
    </>
  );
};

export { Card };
