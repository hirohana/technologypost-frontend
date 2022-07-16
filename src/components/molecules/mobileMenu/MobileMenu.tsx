import useMenuOpen from 'hooks/redux/menuOpen/useMenuOpen';
import styles from './MobileMenu.module.scss';

type PROPS = {
  menus: {
    key: string;
    element: JSX.Element;
  }[];
};

const MobileMenu = (props: PROPS) => {
  const { menus } = props;
  const menuOpen = useMenuOpen();
  return (
    <>
      <nav
        className={`${styles.mobile_menu} ${menuOpen ? styles.menuOpen : ''}`}
      >
        <ul className={styles.mobile_menu__main}>
          {menus.map((menu) => (
            <li key={menu.key} className={styles.mobile_menu__item}>
              {menu.element}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export { MobileMenu };
