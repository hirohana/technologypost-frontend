import { ReactNode, useEffect, useState } from 'react';

import { useGetCookieToReduxStore } from 'hooks/components/Login/useAuthLoginAndSignUp';
import styles from './DefaultLayout.module.scss';
import { useHeaderMenu } from 'hooks/components/defaultLayout/useHeaderMenu';
import HeaderMenu from 'components/organisms/headerMenu/HeaderMenu';
import { Footer } from 'components/molecules/footer/Footer';
import MobileMenu from 'components/molecules/mobileMenu/MobileMenu';
import MobileMenuCover from 'components/molecules/mobileMenuCover/MobileMenuCover';

type PROPS = {
  children: ReactNode;
};

const DefaultLayout = (props: PROPS) => {
  const { children } = props;
  const [appear, setAppear] = useState(false);
  const { menus } = useHeaderMenu();
  useGetCookieToReduxStore();

  // 画面が描画される表示速度を緩やかにしたい為、下記コードを記述することによりクラスappearが付与される。
  // ※本来はuseEffectは副作用の処理を記述する為のもので、レンダリングに関するコードは書かないほうが多分良いと思われるので
  // 将来的に以下のコードは削除するかも。
  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 200);
  }, []);

  return (
    <>
      <MobileMenuCover>
        <div
          className={
            appear ? styles.container_appear : styles.contaienr_disappear
          }
        >
          <HeaderMenu menus={menus} />
          {children}
          <Footer />
        </div>
      </MobileMenuCover>
      <MobileMenu menus={menus} />
    </>
  );
};

export default DefaultLayout;
