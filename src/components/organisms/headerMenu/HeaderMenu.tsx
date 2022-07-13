import MediaQuery from 'react-responsive';

import { HeaderMenuBarColor } from 'components/atoms/header/headerMenuBarColor/HeaderMenuBarColor';
import { HumbergarButton } from 'components/atoms/button/humbergarButton/HumbergarButton';
import { UserInformation } from 'components/molecules/userInformation/UserInformation';
import logo from 'images/icons/pvp.png';
// import WebsiteIconAndTitle from 'components/atoms/image/websiteIconAndTitle/WebsiteIconAndTitle';
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
      <header className={`${styles.header_relative} ${styles.false}`}>
        <HeaderMenuBarColor />
        <div className={styles.container}>
          <MediaQuery query="(max-width: 960px)">
            {/* <WebsiteIconAndTitle icon={logo} title="" /> */}
            <div className={styles.profile_and_humbergar}>
              <div className={styles.profile}>
                <UserInformation />
              </div>
              <HumbergarButton />
            </div>
          </MediaQuery>
          <MediaQuery query="(min-width: 960px)">
            {/* <WebsiteIconAndTitle icon={logo} title="" /> */}
            <div className={styles.profile_and_humbergar}>
              <nav className={styles.header__nav}>
                <ul className={styles.header__ul}>
                  {menus.map((menu) => (
                    <li key={menu.key}>{menu.element}</li>
                  ))}
                </ul>
              </nav>
              <UserInformation />
              <HumbergarButton />
            </div>
          </MediaQuery>
        </div>
      </header>
    </>
  );
};

export default HeaderMenu;
