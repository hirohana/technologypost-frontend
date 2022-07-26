import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import styles from './CategoryIcon.module.scss';

type PROPS = {
  categories: string;
};

const CategoryIcon = (props: PROPS) => {
  const { categories } = props;
  return (
    <div className={styles.category}>
      <LocalOfferIcon className={styles.category_icon} />
      <span className={styles.category_name}>
        {categories ? categories : ''}
      </span>
    </div>
  );
};

export default CategoryIcon;
