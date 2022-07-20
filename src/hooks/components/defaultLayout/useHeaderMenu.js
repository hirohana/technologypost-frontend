/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import { deleteAllCookies } from 'utils/deleteAllCookies/deleteAllCookies';
import { logout } from 'reducks/user/actionCreator';
import { selectUser } from 'reducks/user/selectUser';
import styles from './useHeaderMenu.module.scss';

const useHeaderMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const logoutAction = async () => {
    swal({
      text: 'Webサイトからログアウトしてもよろしいですか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (!willDelete) {
        return;
      }
      if (!user.uid) {
        swal(
          'Error',
          'アカウント登録orWebサイトにログインしていない為\nログアウト処理が出来ません。',
          'error'
        );
        return;
      }
      dispatch(logout());
      deleteAllCookies();
    });
  };

  const menus = [
    {
      key: 'ホーム',
      element: (
        <button onClick={() => navigate('/')} className={styles.button_menu}>
          ホーム
        </button>
      ),
    },
    {
      key: '記事一覧',
      element: (
        <button
          onClick={() => navigate('/articles')}
          className={styles.button_menu}
        >
          記事一覧
        </button>
      ),
    },
    {
      key: '管理人について',
      element: (
        <button
          onClick={() => navigate('/about')}
          className={styles.button_menu}
        >
          管理人について
        </button>
      ),
    },
    {
      key: 'お問い合わせ',
      element: (
        <button
          onClick={() => navigate('/contact')}
          className={styles.button_menu}
        >
          お問い合わせ
        </button>
      ),
    },
    {
      key: 'ログイン',
      element: (
        <button
          onClick={() => navigate('/login')}
          className={styles.button_menu}
        >
          ログイン
        </button>
      ),
    },
    {
      key: 'ログアウト',
      element: (
        <button onClick={() => logoutAction()} className={styles.button_menu}>
          ログアウト
        </button>
      ),
    },
  ];

  return { menus };
};

export { useHeaderMenu };
