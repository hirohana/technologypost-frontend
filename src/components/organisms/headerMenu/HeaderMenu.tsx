import MediaQuery from 'react-responsive';

import { HeaderMenuBarColor } from 'components/atoms/header/headerMenuBarColor/HeaderMenuBarColor';
import { HumbergarButton } from 'components/atoms/button/humbergarButton/HumbergarButton';
import { UserInformation } from 'components/molecules/userInformation/UserInformation';
import styles from './HeaderMenu.module.scss';

type PROPS = {
  menus: {
    key: string;
    element: JSX.Element;
  }[];
};

const HeaderMenu = (props: PROPS) => {
  const { menus } = props;

  return (
    <>
      <header className={styles.header}>
        <HeaderMenuBarColor />
        <div className={styles.container}>
          <div className={styles.profile_and_humbergar}>
            <MediaQuery query="(min-width: 960px)">
              <nav className={styles.header__nav}>
                <ul className={styles.header__ul}>
                  {menus.map((menu) => (
                    <li key={menu.key}>{menu.element}</li>
                  ))}
                </ul>
              </nav>
            </MediaQuery>
            <UserInformation />
            <HumbergarButton />
          </div>
        </div>
      </header>
    </>
  );
};

export { HeaderMenu };
