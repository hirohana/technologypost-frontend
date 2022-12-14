import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUser } from 'reducks/user/selectUser';
import { useUserArticleList } from 'hooks/components/UserArticleList/useUserArticleList';
import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import Error403 from '../error/error403/Error403';
import styles from './UserArticleList.module.scss';
import { SimpleCards } from 'components/organisms/simpleCards/SimpleCards';
import { CardsInformation } from 'components/molecules/cardsInformation/CardsInformation';
import { Pagination } from 'components/molecules/pagination/Pagination';
import AsideScrollTop from 'components/atoms/button/asideScrollTop/AsideScrollTop';
import { trimString } from 'utils/trimString/trimString';

const UserArticleList = () => {
  const { user } = useSelector(selectUser);
  const { username } = useParams();
  const trimUserName = trimString(user.displayName);
  const { data } = useUserArticleList();

  return (
    <DefaultLayout>
      <div className={styles.contaienr}>
        <main>
          {trimUserName === username ? (
            <div className={styles.card_container}>
              <div className={styles.cards_information}>
                <CardsInformation />
              </div>
              <AsideScrollTop />
              {data && <SimpleCards cardsData={data.data} />}
              {data?.pagination.paginationMaxCount ? (
                <Pagination
                  maxPage={data.pagination.paginationMaxCount}
                  url={`user/${username}/article_list`}
                />
              ) : null}
            </div>
          ) : (
            <Error403 />
          )}
        </main>
      </div>
    </DefaultLayout>
  );
};

export default UserArticleList;
