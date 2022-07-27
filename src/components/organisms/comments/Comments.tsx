import styles from './Comments.module.scss';
import { COMMENTS } from 'types/articles/articles';
import Comment from 'components/molecules/comment/Comment';

type PROPS = {
  comments: COMMENTS;
};

const Comments = (props: PROPS) => {
  const { comments } = props;

  return (
    <div className={styles.comments_container}>
      <div className={styles.comments_list}>
        <p className={styles.comments_header}>コメント</p>
        {comments && comments.map((comment) => <Comment comment={comment} />)}
      </div>
    </div>
  );
};

export { Comments };
