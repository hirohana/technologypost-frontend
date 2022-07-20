import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const { menus } = useFooterMenu();
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div className={styles.footer_items}>
        <div className={styles.link_items}>
          {menus.map((menu) => (
            <Link
              to={menu.to}
              key={menu.text}
              className={styles.link_item}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {menu.text}
            </Link>
          ))}
        </div>
        <p className={styles.copy_right}>&copy; &nbsp;{year} Hirohana</p>
      </div>
    </div>
  );
};

export { Footer };

const useFooterMenu = () => {
  const menus = [
    {
      text: 'ホーム',
      to: '/',
    },
    {
      text: '記事一覧',
      to: '/articles',
    },
    {
      text: '管理人について',
      to: '/about',
    },
    {
      text: 'お問い合わせ',
      to: '/contact',
    },
    {
      text: 'ログイン',
      to: '/login',
    },
  ];

  return { menus };
};
