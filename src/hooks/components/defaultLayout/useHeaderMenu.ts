// /* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import swal from 'sweetalert';

// import { logout } from 'reducks/users/actionCreators';
// import { selectUser } from 'reducks/user/selectUser';
// import styles from './useMenusCreate..module.scss';

// const menusCreate = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);

//   const logoutAction = async () => {
//     swal({
//       text: 'Webサイトからログアウトしてもよろしいですか？',
//       icon: 'warning',
//       buttons: ['キャンセル', 'OK'],
//       dangerMode: true,
//     }).then(async (willDelete) => {
//       if (!willDelete) {
//         return;
//       }
//       if (!user.uid) {
//         swal(
//           'Error',
//           'アカウント登録orWebサイトにログインしていない為\nログアウト処理が出来ません。',
//           'error'
//         );
//         return;
//       }
//       await auth.signOut();
//       dispatch(logout());
//       swal('Success', 'ログアウト処理が完了しました!', 'success');
//     });
//   };

//   const menus = [
//     {
//       key: 'home',
//       element: (
//         <button
//           onClick={() => history.push('/')}
//           className={styles.button_menu}
//         >
//           home
//         </button>
//       ),
//     },
//     {
//       key: 'chat',
//       element: (
//         <button
//           onClick={() => history.push('/chat')}
//           className={styles.button_menu}
//         >
//           chat
//         </button>
//       ),
//     },
//     {
//       key: 'contact',
//       element: (
//         <button
//           onClick={() => history.push('/contact')}
//           className={styles.button_menu}
//         >
//           contact
//         </button>
//       ),
//     },
//     {
//       key: 'login',
//       element: (
//         <button
//           onClick={() => history.push('/login')}
//           className={styles.button_menu}
//         >
//           login
//         </button>
//       ),
//     },
//     {
//       key: 'logout',
//       element: (
//         <button onClick={() => logoutAction()} className={styles.button_menu}>
//           logout
//         </button>
//       ),
//     },
//     {
//       key: 'blog',
//       element: (
//         <button
//           onClick={() => history.push('/blogs')}
//           className={styles.button_menu}
//         >
//           blog
//         </button>
//       ),
//     },
//   ];

//   return menus;
// };

// export default menusCreate;
