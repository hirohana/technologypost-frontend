/* eslint-disable @typescript-eslint/no-explicit-any */
// Comments.tsxの子コンポーネントthreeDotMenu.tsxのpropsに渡すオブジェクト
import { config } from 'config/applicationConfig';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';

/**
 * 記事のコメントを削除する関数
 * @param commentId
 */
const deleteComment = async (commentId: number) => {
  try {
    await fetch(`${config.BACKEND_URL}/articles/comments/${commentId}`, {
      method: 'DELETE',
    });
  } catch (err: any) {
    console.error(err);
    sweetAlertOfError(err);
  }
};

const menuForUserArticleList = [
  { title: 'コメント削除', onClick: deleteComment },
];

export { menuForUserArticleList };
