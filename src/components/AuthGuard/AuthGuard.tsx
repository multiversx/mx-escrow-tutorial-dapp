import { PropsWithChildren } from "react";
import { routeNames } from "../../routes";
import { Navigate } from "react-router-dom";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn";

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useGetIsLoggedIn();
  if (!isLoggedIn) {
    return <Navigate to={`/${routeNames.unlock}`} />;
  }

  return <>{children}</>;
};
