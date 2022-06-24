import { useSelector } from "react-redux";

import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import { selectUser } from "reducks/user/selectUser";
import { useArticles } from "hooks/components/articles/useArticles";
import { trimString } from "utils/trimString/trimString";
import ArticlesCards from "components/organisms/ArticlesCards/ArticlesCards";
import TextField from "components/molecules/textField/TextField";
import { PaginationArticles } from "components/molecules/pagination/paginationArticles/PaginationArticles";
import styles from "./Articles.module.scss";
import { Link } from "react-router-dom";

const Articles = () => {
  const { data, setData, searchKeyword, setSearchKeyword, getArticles } =
    useArticles("articles");
  const { user } = useSelector(selectUser);
  const trimUserName = trimString(user.displayName);
  return (
    <DefaultLayout>
      <main>
        <div className={styles.container}>
          {user.uid ? (
            <div className={styles.container_titles}>
              <Link to={`/articles/user/${trimUserName}/article_list`}>
                <p className={styles.user_titles}>
                  {user.displayName}さんの記事一覧
                </p>
              </Link>
            </div>
          ) : null}
          <TextField
            values={searchKeyword}
            changeValues={setSearchKeyword}
            onSubmitHandler={getArticles}
          />
          {data?.data ? (
            <>
              <ArticlesCards data={data.data} />
              <PaginationArticles
                maxPage={data.pagination.paginationMaxCount}
                setData={setData}
              />
            </>
          ) : null}
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Articles;
