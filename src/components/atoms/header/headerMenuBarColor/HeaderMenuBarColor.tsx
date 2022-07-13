import { useInView } from 'react-intersection-observer';

import styles from './HeaderMenuBarColor.module.scss';

const HeaderMenuBarColor = () => {
  const { ref, inView } = useInView({
    rootMargin: '0px',
    triggerOnce: false,
  });
  return (
    <>
      <div ref={ref}></div>
      <div
        className={
          inView
            ? styles.menu_color__transparent
            : styles.menu_color__light_blue
        }
      ></div>
    </>
  );
};

export { HeaderMenuBarColor };
