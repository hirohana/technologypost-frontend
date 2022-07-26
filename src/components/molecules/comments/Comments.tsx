import React from 'react';
import styles from './Comments.module.scss';
import { COMMENTS } from 'types/articles/articles';
import { AvatarImage } from 'components/atoms/button/avatar/AvatarImage';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';

type PROPS = {
  userName: string;
  photoUrl: string;
  comments: COMMENTS;
};

const Comments = (props: PROPS) => {
  const { comments, photoUrl, userName } = props;
  return (
    <div className={styles.comments_container}>
      <div className={styles.comments_list}>
        <p className={styles.comments_header}>コメント</p>
        {comments &&
          comments.map((comment) => (
            <section className={styles.comment_container}>
              <div className={styles.comment_information}>
                <div className={styles.user_informartion}>
                  <AvatarImage src={photoUrl} />
                  {userName}
                </div>
                <TimestampProcessing timestamp={comment.comment_created_at} />
              </div>
              <div className={styles.comment_text}>{comment.user_comment}</div>
            </section>
          ))}
      </div>
    </div>
  );
};

export { Comments };
