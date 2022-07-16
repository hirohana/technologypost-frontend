import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import useMenuOpen from 'hooks/redux/menuOpen/useMenuOpen';
import styles from './MobileMenuCover.module.scss';
import { menuOpenChange } from 'reducks/menuOpen/actionCreator';

type PROPS = {
  children: ReactNode;
};

const MobileMenuCover = (props: PROPS) => {
  const { children } = props;
  const dispatch = useDispatch();
  const menuOpen = useMenuOpen();

  return (
    <div className={`${styles.container} ${menuOpen ? styles.menuOpen : ''}`}>
      <div
        className={styles.mobile_menu__cover}
        onClick={() => dispatch(menuOpenChange(menuOpen))}
      ></div>
      {children}
    </div>
  );
};

export { MobileMenuCover };
