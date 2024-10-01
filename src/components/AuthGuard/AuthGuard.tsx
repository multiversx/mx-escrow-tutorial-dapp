import { PropsWithChildren } from "react";
import { routeNames } from "../../routes";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to={`/${routeNames.unlock}`} />;
  }

  return <>{children}</>;
};
