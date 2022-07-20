import React from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './TitleAnimation.module.scss';

type PROPS = {
  title: string;
};

const TitleAnimation = (props: PROPS) => {
  const { title } = props;
  const { ref, inView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  return (
    <h3
      ref={ref}
      className={`${styles.container} ${inView ? styles.appear : ''}`}
    >
      {title}
    </h3>
  );
};

export { TitleAnimation };
