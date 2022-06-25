import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { selectUser } from "reducks/user/selectUser";
import styles from "./CardsInformation.module.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const CardsInformation = () => {
  const { user } = useSelector(selectUser);
  return (
    <div className={styles.container}>
      <Link to={`/articles/user/${user.displayName}/article_post`}>
        記事作成
      </Link>
      <AppBar position="relative">
        <Toolbar className={styles.title}>
          <CameraAltIcon />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={styles.user_title}
          >
            {user.displayName}の記事一覧
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { CardsInformation };
