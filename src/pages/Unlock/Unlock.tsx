import { CenterLayout } from "../../components/CenterLayout";
import {
  type ExtensionLoginButtonPropsType,
  type WebWalletLoginButtonPropsType,
  type OperaWalletLoginButtonPropsType,
  type LedgerLoginButtonPropsType,
  type WalletConnectLoginButtonPropsType,
  WalletConnectLoginButton,
  LedgerLoginButton,
  ExtensionLoginButton,
  CrossWindowLoginButton,
  LedgerLoginContainerPropsType,
} from "@multiversx/sdk-dapp/UI";
import { routeNames } from "../../routes";
import { useNavigate } from "react-router-dom";

type CommonPropsType =
  | ExtensionLoginButtonPropsType
  | WebWalletLoginButtonPropsType
  | LedgerLoginContainerPropsType
  | WalletConnectLoginButtonPropsType;

export const Unlock = () => {
  const navigate = useNavigate();
  const commonProps: CommonPropsType = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true,
    onLoginRedirect: () => {
      navigate(routeNames.dashboard);
    },
  };

  return (
    <CenterLayout>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-2xl">Login</h2>
        <p className="text-center text-gray-400">Choose a login method</p>

        <div className="flex flex-col md:flex-row">
          <WalletConnectLoginButton
            loginButtonText="xPortal App"
            {...commonProps}
          />
          <LedgerLoginButton loginButtonText="Ledger" {...commonProps} />
          <ExtensionLoginButton
            loginButtonText="DeFi Wallet"
            {...commonProps}
          />
          <CrossWindowLoginButton
            loginButtonText="Web Wallet"
            {...commonProps}
          />
        </div>
      </div>
    </CenterLayout>
  );
};
