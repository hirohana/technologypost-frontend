import { useDispatch } from "react-redux";
import { deleteObject, listAll, ref } from "firebase/storage";
import swal from "sweetalert";

import { storage } from "../../../../firebase";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";
import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";
import { config } from "config/applicationConfig";
import { logout } from "reducks/user/actionCreator";
import { deleteAllCookies } from "utils/deleteAllCookies/deleteAllCookies";
import { useSelector } from "react-redux";
import { selectUser } from "reducks/user/selectUser";
import { trimString } from "utils/trimString/trimString";

// アカウントを削除する関数
// 1. firebaseのstorageからユーザーのプロフィール画像を削除(imageDelete)
// 2. ユーザー情報が格納されているデータベース(users)からユーザー情報を削除。
// 3. Reduxのstore、cookieに登録されているユーザー情報を削除。
// 4. 上記の処理をPromise.allで纏めて処理を行う。
const useDeleteAccount = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const trimUserName = trimString(user.displayName);

  const deleteAccount = () => {
    swal({
      text: "アカウントを削除してもよろしいですか？",
      icon: "warning",
      buttons: ["キャンセル", "OK"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (!willDelete) {
        return;
      }

      /**
       * storageからプロフィール画像を削除する関数
       */
      const deleteImage = async () => {
        try {
          const storageRef = ref(storage, `userProfileImages/${trimUserName}/`);
          const listResult = await listAll(storageRef);
          listResult.items.forEach(async (item) => await deleteObject(item));
        } catch (err: any) {
          sweetAlertOfError(
            `エラーが発生してファイル画像が削除されなかった可能性があります。エラー内容: ${err}`
          );
        }
      };

      /**
       * データベースからユーザー情報を削除
       */
      const deleteDatabaseUsers = async () => {
        const payload = {
          userId: user.uid,
        };
        try {
          const response = await fetch(`${config.BACKEND_URL}/account`, {
            credentials: "include",
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          return data;
        } catch (err: any) {
          console.error(err);
          sweetAlertOfError(
            `エラーが発生してアカウント削除に失敗した可能性があります。エラー内容: ${err}`
          );
        }
      };

      /**
       * store、cookieのユーザー情報を削除
       */
      const deleteStoreAndCookie = async () => {
        dispatch(logout());
        deleteAllCookies();
      };

      // 上記3つの処理をPromise.allで非同期の並行処理
      try {
        const data = await Promise.all([
          deleteDatabaseUsers(),
          deleteImage(),
          deleteStoreAndCookie(),
        ]);
        sweetAlertOfSuccess(data[0].message);
      } catch (err) {
        console.error(err);
        sweetAlertOfError(
          `エラーが発生してアカウント削除に失敗した可能性があります。エラー内容: ${err}`
        );
      }
    });
  };

  return { deleteAccount };
};

export { useDeleteAccount };
