import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div className={styles.footer_items}>
        <div className={styles.link_items}>
          <Link
            to="/"
            className={styles.link_item}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            ホーム
          </Link>
          <Link
            to="/articles"
            className={styles.link_item}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            記事一覧
          </Link>
          <Link
            to="/about"
            className={styles.link_item}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            管理人について
          </Link>
          <Link
            to="/contact"
            className={styles.link_item}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            お問い合わせ
          </Link>
          <Link
            to="/login"
            className={styles.link_item}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            ログイン
          </Link>
        </div>
        <p>&copy; &nbsp;{year} Hirohana</p>
      </div>
    </div>
  );
};

export { Footer };
