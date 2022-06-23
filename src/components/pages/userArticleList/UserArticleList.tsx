import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "reducks/user/selectUser";

import DefaultLayout from "components/templates/defaultLayout/DefaultLayout";
import Error403 from "../error/error403/Error403";
import styles from "./UserArticleList.module.scss";
import { UserArticlesInformation } from "components/molecules/userArticleInformation/UserArticleInformation";

const UserArticleList = () => {
  const { user } = useSelector(selectUser);
  const { username } = useParams();

  return (
    <DefaultLayout>
      <main>
        {user.displayName === username ? (
          <div className={styles.container}>
            <UserArticlesInformation />
          </div>
        ) : (
          <Error403 />
        )}
      </main>
    </DefaultLayout>
  );
};

export default UserArticleList;
