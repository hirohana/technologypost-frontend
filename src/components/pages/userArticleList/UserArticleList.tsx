import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUser } from 'reducks/user/selectUser';
import { useUserArticleList } from 'hooks/components/articles/useArticles';
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
      <main>
        {trimUserName === username ? (
          <div className={styles.container}>
            <CardsInformation />
            <AsideScrollTop />
            {data && <SimpleCards cardsData={data.data} />}
            {data?.pagination.paginationMaxCount && (
              <Pagination
                maxPage={data.pagination.paginationMaxCount}
                url={`articles/user/${username}/article_list`}
              />
            )}
          </div>
        ) : (
          <Error403 />
        )}
      </main>
    </DefaultLayout>
  );
};

export default UserArticleList;
