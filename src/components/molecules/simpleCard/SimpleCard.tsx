import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ref, deleteObject, listAll } from 'firebase/storage';
import { Card, CardContent, Grid } from '@mui/material';

import { storage } from '../../../firebase';
import { ARTICLE_DATA_FOR_USER_ARTICLE_LIST } from 'types/articles/articles';
import { selectUser } from 'reducks/user/selectUser';
import { config } from 'config/applicationConfig';
import ThreeDotMenu from 'components/molecules/threeDotMenu/ThreeDotMenu';
import styles from './SimpleCard.module.scss';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
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

  /**
   * 記事データベース(articles)に対し、サーバー側に送信された記事IDに一致するデータを削除する。
   * また、画像ファイルがあった場合、firebaseのStorageに対してもstorageIdが一致する画像ディレクトリを削除する。
   * @param id
   * @param storageId
   * @returns
   */
  const deleteArticle = async (id: number, storageId: string | null) => {
    if (!window.confirm('記事を削除してもよろしいですか？')) {
      return;
    }

    /**
     * 記事データベース(articles)に対し、一致した記事IDのデータを削除する関数
     * @returns
     */
    const articleDeleteAPI = async () => {
      const response = await fetch(`${config.BACKEND_URL}/articles/${id}`, {
        method: 'DELETE',
      });
      const jsonData = await response.json();
      return jsonData;
    };

    /**
     * 画像ファイルがあった場合、firebaseのStorageに対しstorageIdが一致するディレクトリを削除する関数
     */
    const storageDeleteAPI = async () => {
      const storageRef = ref(
        storage,
        `articleImages/${storageId}/${trimUserName}/`
      );
      const listResult = await listAll(storageRef);
      listResult.items.forEach(async (item) => {
        await deleteObject(item);
      });
    };

    try {
      await Promise.all([articleDeleteAPI(), storageDeleteAPI()]);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {data.article_id ? (
        <Grid item key={`${data.title}${index}`} xs={12} sm={6} md={4}>
          <Card className={styles.card}>
            <div className={styles.menu_container}>
              <button
                title="削除"
                onClick={() =>
                  deleteArticle(data.article_id, data.article_id_of_storage)
                }
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
            <div
              className={styles.card_container}
              onClick={
                data.public === 1
                  ? () => navigate(`/articles/article/${data.article_id}`)
                  : () =>
                      navigate(
                        `/articles/user/${trimUserName}/article_post/${data.article_id}`
                      )
              }
            >
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
