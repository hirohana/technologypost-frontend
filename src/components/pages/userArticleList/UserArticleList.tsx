import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectUser } from "reducks/user/selectUser";
import { useUserArticleList } from "hooks/components/articles/useArticles";
import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import Error403 from "../error/error403/Error403";
import styles from "./UserArticleList.module.scss";
import UserArticleTitleList from "components/organisms/simpleCards/SimpleCards";
import { UserArticlesInformation } from "components/molecules/userArticleInformation/UserArticleInformation";
import { Pagination } from "components/molecules/pagination/Pagination";

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
