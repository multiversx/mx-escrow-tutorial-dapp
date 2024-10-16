import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider/DappProvider";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import {
  SignTransactionsModals,
  TransactionsToastList,
} from "@multiversx/sdk-dapp/UI";

export default function App() {
  return (
    <DappProvider
      environment={EnvironmentsEnum.devnet}
      customNetworkConfig={{
        walletConnectV2ProjectId: "9b1a9564f91cb659ffe21b73d5c4e2d8",
      }}
    >
      <TransactionsToastList />
      <SignTransactionsModals />
      <RouterProvider router={routes} />
    </DappProvider>
  );
}
