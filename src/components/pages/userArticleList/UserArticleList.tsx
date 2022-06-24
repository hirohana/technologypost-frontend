import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectUser } from "reducks/user/selectUser";
import { useUserArticleList } from "hooks/components/articles/useArticles";
import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import Error403 from "../error/error403/Error403";
import styles from "./UserArticleList.module.scss";
import UserArticleTitleList from "components/organisms/userArticleTitleList/UserArticleTitleList";
import { UserArticlesInformation } from "components/molecules/userArticleInformation/UserArticleInformation";
import { PaginationArticles } from "components/molecules/pagination/paginationArticles/PaginationArticles";

const UserArticleList = () => {
  const { user } = useSelector(selectUser);
  const { username } = useParams();
  const { data } = useUserArticleList();

  return (
    <DefaultLayout>
      <main>
        {user.displayName === username ? (
          <div className={styles.container}>
            <UserArticlesInformation />
            {data && <UserArticleTitleList articlesData={data.data} />}
            {data?.pagination.paginationMaxCount && (
              <PaginationArticles
                maxPage={data.pagination.paginationMaxCount}
                setData
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
