import React from "react";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { USER_INITIAL_STATE } from "reducks/user/types";
import styles from "./FavoriteIcon.module.scss";

type PROPS = {
  likes: string[];
};

const FavoriteLikeIcon = (props: PROPS) => {
  const { likes } = props;
  const user = useSelector((state: USER_INITIAL_STATE) => state);
  const userName = user.displayName;

  return (
    <div className={styles.container}>
      <div className={likes.includes(userName) ? `${styles.likes_user}` : ""}>
        <FavoriteIcon className={styles.favoriteIcon} />
        &nbsp;<span className={styles.number}>{likes?.length}</span>
      </div>
    </div>
  );
};

export default FavoriteLikeIcon;
