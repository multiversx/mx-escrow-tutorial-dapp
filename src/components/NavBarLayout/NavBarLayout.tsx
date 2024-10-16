import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { logout } from "@multiversx/sdk-dapp/utils/logout";
import { PropsWithChildren, useEffect, useState } from "react";
import { routeNames } from "../../routes";
import { useSetupInterceptors } from "../../hooks";
import { CenterLayout } from "../CenterLayout";
import { Loader } from "@multiversx/sdk-dapp/UI";
export const NavBarLayout = ({ children }: PropsWithChildren) => {
  const { interceptorApplied } = useSetupInterceptors();
  const [openNav, setOpenNav] = useState(false);
  const logoutHandler = () => {
    logout(routeNames.unlock);
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  if (!interceptorApplied) {
    return (
      <CenterLayout>
        <Loader noText />
      </CenterLayout>
    );
  }

  return (
    <div className=" max-h-[100vh] w-[calc(100%+20px)] overflow-scroll">
      <Navbar
        placeholder=""
        className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            placeholder=""
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <strong>Escrow tutorial</strong>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              <Button
                onClick={logoutHandler}
                placeholder=""
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Logout</span>
              </Button>
            </div>
            <IconButton
              placeholder=""
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="flex items-center gap-x-1">
            <Button
              onClick={logoutHandler}
              placeholder=""
              fullWidth
              variant="gradient"
              size="sm"
              className=""
            >
              <span>Logout</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div className="mt-10 h-full">{children}</div>
    </div>
  );
};
