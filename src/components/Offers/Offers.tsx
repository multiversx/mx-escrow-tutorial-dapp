import { Loader } from "@multiversx/sdk-dapp/UI";
import { IOffersProps, useOffers } from "../../hooks";
import { Card } from "../Card";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import { useEffect } from "react";
import { removeSignedTransaction } from "@multiversx/sdk-dapp/services/transactions/clearTransactions";
import { Table } from "../Table";

interface IOfferComponentProps extends IOffersProps {
  cardTitle: string;
  transactionSessionId?: string;
}

const TABLE_HEAD = ["Offer id", "Creator", "Offered", "For", "To", "Action"];

export const Offers = ({
  endpoint,
  actionCallback,
  actionLable,
  actionInProgress,
  cardTitle,
  transactionSessionId,
}: IOfferComponentProps) => {
  const transactionStatus = useTrackTransactionStatus({
    transactionId: transactionSessionId || "",
  });
  const { tableRows, loading, error, refetch } = useOffers({
    actionInProgress: actionInProgress,
    endpoint,
    actionCallback,
    actionLable,
  });

  useEffect(() => {
    if (transactionStatus.isSuccessful && transactionSessionId) {
      removeSignedTransaction(transactionSessionId);
      refetch();
    }
  }, [transactionStatus]);

  return (
    <Card title={cardTitle} subtitle="">
      {tableRows.length > 0 && (
        <div className="overflow-auto">
          <Table rows={tableRows} header={TABLE_HEAD} />
        </div>
      )}

      {tableRows.length == 0 && !error && (
        <div className="flex justify-center text-gray-500">
          <div>No offers!</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center text-red-400">
          <div>Error! Could not retrieve offers!</div>
        </div>
      )}

      {loading && <Loader noText />}
    </Card>
  );
};
