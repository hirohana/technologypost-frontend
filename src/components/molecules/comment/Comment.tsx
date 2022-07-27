import { useSelector } from 'react-redux';

import { selectUser } from 'reducks/user/selectUser';
import { AvatarImage } from 'components/atoms/button/avatar/AvatarImage';
import TimestampProcessing from 'components/atoms/timestampProcessing/TimestampProcessing';
import ThreeDotMenu from '../../molecules/threeDotMenu/ThreeDotMenu';
import { menuForUserArticleList } from 'components/molecules/threeDotMenu/menuForComments';
import { COMMENT } from 'types/articles/articles';
import styles from './Comment.module.scss';

type PROPS = {
  comment: COMMENT;
};

const Comment = (props: PROPS) => {
  const { comment } = props;
  const { user } = useSelector(selectUser);

  return (
    <section className={styles.comment_container} key={comment.comment_id}>
      <div className={styles.comment_information}>
        <div className={styles.user_informartion}>
          <AvatarImage src={comment.user_photo_url} />
          {comment.username}
        </div>
        <div className={styles.threedot_timestamp}>
          {comment.username === user.displayName && (
            <ThreeDotMenu
              menuLists={menuForUserArticleList}
              id={comment.comment_id}
            />
          )}
          <TimestampProcessing timestamp={comment.comment_created_at} />
        </div>
      </div>
      <div className={styles.comment_text}>{comment.user_comment}</div>
    </section>
  );
};

export default Comment;
