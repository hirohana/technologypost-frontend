import { ReactNode, useEffect, useState } from "react";

import { useGetCookieToReduxStore } from "hooks/components/Login/useAuthLoginAndSignUp";
import { useHeaderMenu } from "hooks/components/defaultLayout/useHeaderMenu";
import { HeaderMenu } from "components/organisms/headerMenu/HeaderMenu";
import { Footer } from "components/molecules/footer/Footer";
import { MobileMenu } from "components/molecules/mobileMenu/MobileMenu";
import { MobileMenuCover } from "components/molecules/mobileMenuCover/MobileMenuCover";
import { LoadingIcon } from "components/atoms/loadingIcon/LoadingIcon";

type PROPS = {
  children: ReactNode;
};

const DefaultLayout = (props: PROPS) => {
  const { children } = props;
  const [loading, setLoading] = useState(true);
  const { menus } = useHeaderMenu();
  useGetCookieToReduxStore();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <MobileMenuCover>
            <div>
              <HeaderMenu menus={menus} />
              {children}
              <Footer />
            </div>
          </MobileMenuCover>
          <MobileMenu menus={menus} />
        </>
      )}
    </>
  );
};

export default DefaultLayout;
