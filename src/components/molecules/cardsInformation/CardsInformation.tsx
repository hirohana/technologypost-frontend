import { useSelector } from 'react-redux';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { useDraftInitialDataSet } from 'hooks/components/UserArticleList/useUserArticleList';
import { selectUser } from 'reducks/user/selectUser';
import styles from './CardsInformation.module.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CardsInformation = () => {
  const { user } = useSelector(selectUser);
  const { draftInitialDataSet } = useDraftInitialDataSet();

  return (
    <div className={styles.container}>
      <Button onClick={draftInitialDataSet}>記事作成</Button>
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
