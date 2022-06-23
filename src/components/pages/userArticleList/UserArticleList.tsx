import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectUser } from "reducks/user/selectUser";
import { useGetArticlesOfUser } from "hooks/components/articles/useArticles";
import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import Error403 from "../error/error403/Error403";
import styles from "./UserArticleList.module.scss";
import { UserArticlesInformation } from "components/molecules/userArticleInformation/UserArticleInformation";
import { useState } from "react";

const UserArticleList = () => {
  const [publicState, setPublicState] = useState(true);
  const { user } = useSelector(selectUser);
  const { username } = useParams();
  const { data } = useGetArticlesOfUser();

  return (
    <DefaultLayout>
      <main>
        {user.displayName === username ? (
          <div className={styles.container}>
            <UserArticlesInformation />
            {publicState ? (
              <p onClick={getDraftArticles}>下書き記事一覧</p>
            ) : (
              <p onClick={getPublicArticles}>公開記事一覧</p>
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
