/* eslint-disable @typescript-eslint/no-explicit-any */
// ページUserArticleList.tsxの子コンポーネントthreeDotMenu.tsxのpropsに渡すオブジェクト
import { config } from 'config/applicationConfig';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import sweetAlertOfSuccess from 'utils/sweetAlert/sweetAlertOfSuccess';

/**
 * 記事を非公開から公開に変更する関数
 * @param id
 */
const updateArticlesDBtoTrue = async (id: number) => {
  try {
    const response = await fetch(
      `${config.BACKEND_URL}/articles/${id}/${true}`,
      {
        method: 'PUT',
      }
    );
    const jsonData = await response.json();
    window.location.reload();
    sweetAlertOfSuccess(jsonData.message);
  } catch (err: any) {
    console.error(err);
    sweetAlertOfError(err);
  }
};

/**
 * 記事を公開から非公開に変更する関数
 * @param id
 */
const updateArticlesDBtoFalse = async (id: number) => {
  try {
    const response = await fetch(
      `${config.BACKEND_URL}/articles/${id}/${false}`,
      {
        method: 'PUT',
      }
    );
    const jsonData = await response.json();
    window.location.reload();
    sweetAlertOfSuccess(jsonData.message);
  } catch (err: any) {
    console.error(err);
    sweetAlertOfError(err);
  }
};

const menuForUserArticleList = [
  { title: '日記を公開する', onClick: updateArticlesDBtoTrue },
  { title: '日記を非公開にする', onClick: updateArticlesDBtoFalse },
];

export { menuForUserArticleList };
