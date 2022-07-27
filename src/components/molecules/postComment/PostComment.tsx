import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducks/user/selectUser';
import styles from './PostComment.module.scss';

type PROPS = {
  text: string;
  setText: any;
  onSubmit: () => void;
};

const PostComment = (props: PROPS) => {
  const { onSubmit, text, setText } = props;

  const { user } = useSelector(selectUser);
  return (
    <>
      {user.uid && (
        <div className={styles.container}>
          <div className={styles.comment_container}>
            <div className={styles.comment_information}>
              <p className={styles.comment_title}>コメント投稿</p>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!text}
                className={!text ? styles.send_disable_btn : styles.send_btn}
                onClick={onSubmit}
              >
                投稿
              </Button>
            </div>
            <TextField
              variant="outlined"
              fullWidth
              multiline={true}
              label="コメント入力"
              className={styles.textfiled}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostComment;
