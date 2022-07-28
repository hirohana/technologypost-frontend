import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import { Cards } from 'components/organisms/cards/Cards';
import { selectUser } from 'reducks/user/selectUser';
import { useArticles } from 'hooks/components/articles/useArticles';
import { trimString } from 'utils/trimString/trimString';
import { SearchField } from 'components/molecules/searchField/SearchField';
import { Pagination } from 'components/molecules/pagination/Pagination';
import { LoadingIcon } from 'components/atoms/loadingIcon/LoadingIcon';
import styles from './Articles.module.scss';
import { SearchResultNotFound } from 'components/atoms/searchResultNotFound/SearchResultNotFound';
import { Button } from '@mui/material';

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const {
    keyword,
    data,
    searchKeyword,
    setSearchKeyword,
    getArticlesBySearch,
  } = useArticles(setLoading);
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const trimUserName = trimString(user.displayName);

  return (
    <DefaultLayout>
      {loading ? (
        <LoadingIcon />
      ) : (
        <main>
          <div className={styles.container}>
            {user.uid ? (
              <div className={styles.container_titles}>
                <Button
                  className={styles.user_titles}
                  onClick={() => navigate(`/user/${trimUserName}/article_list`)}
                >
                  {user.displayName}の記事一覧
                </Button>
              </div>
            ) : null}
            <SearchField
              values={searchKeyword}
              changeValues={setSearchKeyword}
              onSubmitHandler={getArticlesBySearch}
            />
            {data?.data.length ? (
              <>
                <Cards data={data.data} />
                <Pagination
                  maxPage={data.pagination.paginationMaxCount}
                  url=""
                />
              </>
            ) : (
              <SearchResultNotFound keyword={keyword} />
            )}
          </div>
        </main>
      )}
    </DefaultLayout>
  );
};

export default Articles;
