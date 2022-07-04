import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, Grid } from '@mui/material';

import { ARTICLE_DATA_FOR_USER_ARTICLE_LIST } from 'types/articles/articles';
import { selectUser } from 'reducks/user/selectUser';
import { config } from 'config/applicationConfig';
import ThreeDotMenu from 'components/molecules/threeDotMenu/ThreeDotMenu';
import styles from './SimpleCard.module.scss';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import sweetAlertOfSuccess from 'utils/sweetAlert/sweetAlertOfSuccess';
import { trimString } from 'utils/trimString/trimString';
import { menuForUserArticleList } from 'components/molecules/threeDotMenu/menuForUserArticleListPage';

type PROPS = {
  data: ARTICLE_DATA_FOR_USER_ARTICLE_LIST;
  index: number;
};

const SimpleCard = (props: PROPS) => {
  const { data, index } = props;
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const trimUserName = trimString(user.displayName);

  const deleteArticle = async (id: number) => {
    if (!window.confirm('記事を削除してもよろしいですか？')) {
      return;
    }
    try {
      const response = await fetch(
        `${config.BACKEND_URL}/articles/user/article_list/delete?id=${id}`,
        {
          method: 'DELETE',
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
      {data.article_id ? (
        <Grid item key={`${data.title}${index}`} xs={12} sm={6} md={4}>
          <Card
            className={styles.card}
            onClick={
              data.public === 1
                ? () => navigate(`/articles/article/${data.article_id}`)
                : () =>
                    navigate(
                      `/articles/user/${user.displayName}/article_post/${data.article_id}`
                    )
            }
          >
            <div className={styles.image_and_delete}>
              <button
                title="削除"
                onClick={() => deleteArticle(data.article_id)}
              >
                ✖
              </button>
              <div className={styles.three_dot_menu}>
                <ThreeDotMenu
                  menuLists={menuForUserArticleList}
                  id={data.article_id}
                />
              </div>
            </div>
            <div>
              <CardContent className={styles.card_content}>
                <p className={styles.card_title}>タイトル: {data.title}</p>
                <div className={styles.card_timestamp}>
                  <TimestampProcessing timestamp={data.created_at} />
                </div>
                <p>
                  {data.public ? (
                    <span className={styles.public}>公開</span>
                  ) : (
                    <span className={styles.draft}>下書き</span>
                  )}
                </p>
              </CardContent>
            </div>
          </Card>
        </Grid>
      ) : null}
    </>
  );
};

export default SimpleCard;
