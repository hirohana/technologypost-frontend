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
      key: 'home',
      element: (
        <button onClick={() => navigate('/')} className={styles.button_menu}>
          home
        </button>
      ),
    },
    {
      key: 'articles',
      element: (
        <button
          onClick={() => navigate('/articles')}
          className={styles.button_menu}
        >
          articles
        </button>
      ),
    },
    {
      key: 'about',
      element: (
        <button
          onClick={() => navigate('/about')}
          className={styles.button_menu}
        >
          about
        </button>
      ),
    },
    {
      key: 'contact',
      element: (
        <button
          onClick={() => navigate('/contact')}
          className={styles.button_menu}
        >
          contact
        </button>
      ),
    },
    {
      key: 'login',
      element: (
        <button
          onClick={() => navigate('/login')}
          className={styles.button_menu}
        >
          login
        </button>
      ),
    },
    {
      key: 'logout',
      element: (
        <button onClick={() => logoutAction()} className={styles.button_menu}>
          logout
        </button>
      ),
    },
  ];

  return { menus };
};

export { useHeaderMenu };
