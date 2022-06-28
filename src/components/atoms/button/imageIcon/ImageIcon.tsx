import React, { memo } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import styles from "./ImageIcon.module.scss";

type PROPS = {
  image: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageIcon = memo((props: PROPS) => {
  const { image, onChange } = props;
  return (
    <div className={styles.image_icon}>
      <label>
        <AddAPhotoIcon
          className={image ? styles.tweet_addIconLoaded : styles.tweet_addIcon}
        />
        <input
          className={styles.tweet_hiddenIcon}
          type="file"
          onChange={onChange}
        />
      </label>
    </div>
  );
});

export default ImageIcon;
