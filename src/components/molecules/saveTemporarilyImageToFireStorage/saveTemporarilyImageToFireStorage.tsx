import { storage, db } from "../../../firebase";
import firebase from "firebase/app";

import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";

import styles from "./ImageTemporarily.module.scss";

type PROPS = {
  blankRemovalName: string;
  fileNames: string[];
  id: string;
  imageDbUrls: string[];
};

const ImageTemporarily = (props: PROPS) => {
  const { blankRemovalName, fileNames, id, imageDbUrls } = props;

  // firebaseのstorage及びfirestoreから該当するfilename,imageDbUrlを削除する関数。
  const imageDelete = async (imageDbUrl: string, index: number) => {
    const storageDelete = () => {
      return new Promise((resolove, reject) => {
        const storageRef = storage
          .ref(`blogImages/${blankRemovalName}/${id}`)
          .child(fileNames[index]);
        storageRef
          .delete()
          .then(() => {
            resolove("成功");
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    };
    const firestoreDelete = () => {
      return new Promise((resolove, reject) => {
        const firestoreRef = db
          .collection("draftBlogs")
          .doc(blankRemovalName)
          .collection("blogs")
          .doc(id);
        firestoreRef
          .update({
            fileNames: firebase.firestore.FieldValue.arrayRemove(
              fileNames[index]
            ),
            imageDbUrls: firebase.firestore.FieldValue.arrayRemove(imageDbUrl),
          })
          .then(() => {
            resolove("成功");
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    };

    Promise.all([storageDelete(), firestoreDelete()]).catch((err) => {
      sweetAlertOfError(`ファイル削除に失敗しました。 エラー内容: ${err}`);
    });
  };

  return (
    <div className={styles.container}>
      {imageDbUrls.map((imageDbUrl, index) => (
        <div
          key={fileNames[index]}
          className={styles.container_image_deleteButton}
          title="削除"
        >
          <img src={imageDbUrl} alt={fileNames[index]} />
          <button onClick={() => imageDelete(imageDbUrl, index)}>✖</button>
        </div>
      ))}
    </div>
  );
};

export default ImageTemporarily;
