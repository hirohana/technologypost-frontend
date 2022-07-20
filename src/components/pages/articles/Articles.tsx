import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import { selectUser } from 'reducks/user/selectUser';
import { useArticles } from 'hooks/components/articles/useArticles';
import { trimString } from 'utils/trimString/trimString';
import { Cards } from 'components/organisms/cards/Cards';
import TextField from 'components/molecules/textField/TextField';
import { Pagination } from 'components/molecules/pagination/Pagination';
import { LoadingIcon } from 'components/atoms/loadingIcon/LoadingIcon';
import styles from './Articles.module.scss';
import SearchResultNotFound from 'components/molecules/searchResultNotFound/SearchResultNotFound';

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const { data, searchKeyword, setSearchKeyword, getArticlesBySearch } =
    useArticles(setLoading);
  const { user } = useSelector(selectUser);
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
                <Link to={`/articles/user/${trimUserName}/article_list`}>
                  <p className={styles.user_titles}>
                    {user.displayName}の記事一覧
                  </p>
                </Link>
              </div>
            ) : null}
            <TextField
              values={searchKeyword}
              changeValues={setSearchKeyword}
              onSubmitHandler={getArticlesBySearch}
            />
            {data?.data.length ? (
              <>
                <Cards data={data.data} />
                <Pagination
                  maxPage={data.pagination.paginationMaxCount}
                  url="articles"
                />
              </>
            ) : (
              <SearchResultNotFound keyword={searchKeyword} />
            )}
          </div>
        </main>
      )}
    </DefaultLayout>
  );
};

export default Articles;
