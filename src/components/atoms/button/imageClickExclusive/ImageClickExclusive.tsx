import React, { memo } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import styles from './ImageClickExclusive.module.scss';

type PROPS = {
  image: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  textArea: string;
  category: string;
};

const ImageClickExclusive = memo((props: PROPS) => {
  const { image, onChange, text, textArea, category } = props;
  return (
    <div className={styles.image_icon}>
      <label>
        {/* <AddAPhotoIcon
          className={text || ? styles.tweet_addIconLoaded : styles.tweet_addIcon}
        /> */}
        <input
          className={styles.tweet_hiddenIcon}
          type="file"
          onChange={onChange}
        />
      </label>
    </div>
  );
});

export default ImageClickExclusive;
