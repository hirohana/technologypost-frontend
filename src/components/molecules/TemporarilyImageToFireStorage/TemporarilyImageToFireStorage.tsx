import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase';

import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import styles from './TemporarilyImageToFireStorage.module.scss';
import { trimString } from 'utils/trimString/trimString';

type PROPS = {
  fileNames: string[];
  images: string[];
};

const TemporarilyImageToFireStorage = (props: PROPS) => {
  const { fileNames, images } = props;
  const { user } = useSelector(selectUser);

  // firebaseのstorage及びfirestoreから該当するfilename,imageDbUrlを削除する関数。
  const imageDelete = (index: number) => {
    const trimName = trimString(user.displayName);

    (async () => {
      try {
        const storageRef = ref(
          storage,
          `articleImages/${trimName}/articleImage/${fileNames[index]}`
        );
        await deleteObject(storageRef);
      } catch (err: any) {
        sweetAlertOfError(err);
      }
    })();
  };

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div
          key={fileNames[index]}
          className={styles.container_image_deleteButton}
          title="削除"
        >
          <img src={image} alt={fileNames[index]} />
          <button onClick={() => imageDelete(index)}>✖</button>
        </div>
      ))}
    </div>
  );
};

export { TemporarilyImageToFireStorage };
