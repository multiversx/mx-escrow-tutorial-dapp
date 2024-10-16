import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { useEffect, useState } from "react";
import { setupInterceptors } from "../helpers";

export const useSetupInterceptors = () => {
  const { tokenLogin } = useGetLoginInfo();
  const navtiveAuthToken = tokenLogin?.nativeAuthToken;
  const [interceptorApplied, setInterceptorApplied] = useState(false);

  useEffect(() => {
    if (!navtiveAuthToken) {
      return;
    }
    setupInterceptors(navtiveAuthToken);
    setInterceptorApplied(true);
  }, [navtiveAuthToken]);

  return { interceptorApplied };
};
