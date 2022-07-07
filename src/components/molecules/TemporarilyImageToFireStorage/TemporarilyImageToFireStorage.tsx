import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase';

import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import styles from './TemporarilyImageToFireStorage.module.scss';
import { trimString } from 'utils/trimString/trimString';

type PROPS = {
  fireStorageId: string;
  fileNames: string[];
  images: string[];
  markdownValue: string;
  setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setMarkdownValue: React.Dispatch<React.SetStateAction<string>>;
};

const TemporarilyImageToFireStorage = (props: PROPS) => {
  const {
    fireStorageId,
    fileNames,
    images,
    setFileNames,
    setImages,
    markdownValue,
    setMarkdownValue,
  } = props;
  const { user } = useSelector(selectUser);

  // firebaseのfierStorageから該当するファイルを削除する関数。
  const imageDelete = async (index: number, image: string) => {
    const trimName = trimString(user.displayName);

    try {
      const storageRef = ref(
        storage,
        `articleImages/${fireStorageId}/${trimName}/${fileNames[index]}`
      );
      await deleteObject(storageRef);

      const newFileNames = fileNames.filter((fileName) => {
        return fileName !== fileNames[index];
      });
      const newImages = images.filter((image) => {
        return image !== images[index];
      });
      let copyMarkdownValue = markdownValue;
      const newMarkdownValue = copyMarkdownValue.replace(
        `![image](${image})\n`,
        ''
      );
      setFileNames(newFileNames);
      setImages(newImages);
      setMarkdownValue(newMarkdownValue);
    } catch (err: any) {
      sweetAlertOfError(err);
    }
  };

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div
          key={image}
          className={styles.container_image_deleteButton}
          title="削除"
        >
          <img src={image} alt={image} />
          <button onClick={() => imageDelete(index, image)}>✖</button>
        </div>
      ))}
    </div>
  );
};

export { TemporarilyImageToFireStorage };
