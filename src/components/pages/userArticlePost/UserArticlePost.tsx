/* eslint-disable react-hooks/exhaustive-deps*/
import { useParams } from 'react-router-dom';
import SimpleMde from 'react-simplemde-editor';
import DOMPurify from 'dompurify';
import marked from 'marked';
import { Button, TextField } from '@mui/material';
import 'easymde/dist/easymde.min.css';

import { useUserArticlePost } from 'hooks/components/UserArticlePost/useUserArticlePost';
import { TemporarilyImageToFireStorage } from 'components/molecules/TemporarilyImageToFireStorage/TemporarilyImageToFireStorage';
import Error403 from 'components/pages/error/error403/Error403';
import ImageIcon from 'components/atoms/button/imageIcon/ImageIcon';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import styles from './UserArticlePost.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import { trimString } from 'utils/trimString/trimString';
import { SelectPulldown } from 'components/molecules/selectPulldown/SelectPulldown';
import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';

const UserArticlePost = () => {
  const { user } = useSelector(selectUser);
  const { username } = useParams();
  const trimUserName = trimString(user.displayName);

  const {
    category,
    handleSubmit,
    fireStorageId,
    fileNames,
    images,
    setFileNames,
    setImages,
    text,
    setText,
    selectedCategory,
    setSelectedCategory,
    setMarkdownValue,
    markdownValue,
    onMarkdownChange,
    image,
    changeImageHandler,
  } = useUserArticlePost();

  return (
    <DefaultLayout>
      <>
        {trimUserName === username ? (
          <main className={styles.global_container}>
            <div className={styles.container}>
              {category.length !== 0 && (
                <>
                  <TemporarilyImageToFireStorage
                    articleIdOfFireStorage={fireStorageId}
                    fileNames={fileNames}
                    images={images}
                    setFileNames={setFileNames}
                    setImages={setImages}
                    markdownValue={markdownValue}
                    setMarkdownValue={setMarkdownValue}
                  />
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.container_main}>
                      <div className={styles.image_icon}>
                        <ImageIcon
                          image={image}
                          onChange={(e) => changeImageHandler(e)}
                        />
                      </div>

                      <TextField
                        variant="outlined"
                        fullWidth
                        required
                        multiline={true}
                        label="タイトル(必須)"
                        className={styles.textfiled}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />

                      <SelectPulldown
                        menus={category}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                      />

                      <SimpleMde
                        value={markdownValue}
                        onChange={onMarkdownChange}
                      />
                      <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(marked(markdownValue)),
                          }}
                        ></div>
                      </div>
                      <div className={styles.create_date}>
                        <div className={styles.timestamp}>
                          作成日 &nbsp;
                          <TimestampProcessing
                            timestamp={new Date().toISOString()}
                          />
                        </div>
                        作成者 &nbsp;{user.displayName}
                      </div>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={
                          !text || !markdownValue || !selectedCategory.length
                        }
                        className={
                          !text || !markdownValue || !selectedCategory.length
                            ? styles.send_disable_btn
                            : styles.send_btn
                        }
                      >
                        下書き保存
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </main>
        ) : (
          <Error403 />
        )}
      </>
    </DefaultLayout>
  );
};

export default UserArticlePost;
