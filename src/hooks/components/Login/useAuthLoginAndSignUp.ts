import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { storage } from '../../../firebase';
import { config } from 'config/applicationConfig';
import { login } from 'reducks/user/actionCreator';
import sweetAlertOfSuccess from 'utils/sweetAlert/sweetAlertOfSuccess';
import { setCookie } from 'utils/setCookie/setCookie';
import sweetAlertOfError from 'utils/sweetAlert/sweetAlertOfError';
import { updateProfile } from 'reducks/user/actionCreator';
import { randomChar16 } from 'utils/randomChar16/randomChar16';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { trimString } from 'utils/trimString/trimString';
import { useChangeImageHandler } from '../changeImage/useChangeImage';
import { isLoading } from 'reducks/loading/actionCreator';

/**
 * パスワード認証、アカウント登録を行うフック。
 * Loginページで使われているカスタムフック。
 * @returns
 */
const useAuthLoginAndSignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypingPassword, setRetypingPassword] = useState('');
  const dispatch = useDispatch();
  const { image, changeImageHandler } = useChangeImageHandler();

  // アカウント登録を行う際に使用する関数
  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.confirm('アカウント登録を行ってもよろしいですか？')) {
      return;
    }
    if (password !== retypingPassword) {
      sweetAlertOfError(
        'パスワードと確認用パスワードが一致していません。\nもう一度パスワード入力をお願い致します。'
      );
      return;
    }
    if (image === null) {
      sweetAlertOfError('プロフィール画像が設定されていません。');
      return;
    }
    let photoUrl = '';
    dispatch(isLoading(true));
    try {
      const randomChar = randomChar16();
      const fileName = randomChar + '_' + image.name;
      const trimUserName = trimString(userName);
      const storageRef = ref(
        storage,
        `userProfileImages/${trimUserName}/${fileName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            photoUrl = downloadURL;
            const payload = {
              userName,
              email,
              password,
              photoUrl,
            };
            const response = await fetch(
              `${config.BACKEND_URL}/account/signup`,
              {
                method: 'POST',
                credentials: 'include',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              }
            );
            const data = await response.json();
            setUserName('');
            setEmail('');
            setPassword('');
            setRetypingPassword('');
            dispatch(isLoading(false));
            sweetAlertOfSuccess(data.message);
          });
        }
      );
    } catch (err: any) {
      dispatch(isLoading(false));
      console.error(err);
      alert(err);
      return;
    }
  };

  // Eメールとパスワードを使ったログイン認証を行う関数
  const authLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(isLoading(true));
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(`${config.BACKEND_URL}/account/login`, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const { message, user } = await response.json();
      switch (response.status) {
        case 401:
        case 500:
          sweetAlertOfError(message);
          break;
      }

      dispatch(
        login({
          uid: user[0].userId,
          displayName: user[0].displayName,
          photoUrl: user[0].photoUrl,
        })
      );
      await Promise.all([
        setCookie('id', String(user[0].userId), { expires: 1, secure: true }),
        setCookie('displayName', String(user[0].displayName), {
          expires: 1,
          secure: true,
        }),
        setCookie('photoUrl', String(user[0].photoUrl), {
          expires: 1,
          secure: true,
        }),
      ]);
      dispatch(isLoading(false));
      setEmail('');
      setPassword('');
      sweetAlertOfSuccess(message);
    } catch (err: any) {
      dispatch(isLoading(false));
      console.error(err);
      sweetAlertOfError(err);
    }
  };

  return {
    image,
    userName,
    email,
    password,
    retypingPassword,
    changeImageHandler,
    setUserName,
    setEmail,
    setPassword,
    setRetypingPassword,
    authLogin,
    signUp,
  };
};

const useGetCookieToReduxStore = () => {
  const dispatch = useDispatch();
  const getCookie = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      let value = '';
      const arrayCookies = document.cookie.replace(/ /g, '');
      const cookies = arrayCookies.split(';');
      cookies.forEach((cookie) => {
        let keyValue = cookie.split('=');
        if (keyValue[0] === name) {
          value = decodeURIComponent(keyValue[1]);
        }
      });
      resolve(value);
    });
  };

  useEffect(() => {
    (async () => {
      const arrayCookies = await Promise.all([
        getCookie('id'),
        getCookie('displayName'),
        getCookie('photoUrl'),
      ]);
      if (!arrayCookies[0]) {
        return;
      }
      dispatch(
        updateProfile({
          uid: arrayCookies[0],
          displayName: arrayCookies[1],
          photoUrl: arrayCookies[2],
        })
      );
    })();
  }, [dispatch]);
};

export { useAuthLoginAndSignUp, useGetCookieToReduxStore };
