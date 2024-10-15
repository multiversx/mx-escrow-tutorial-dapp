import { useState } from "react";
import { Offers } from "../../../components/Offers";
import useAxios from "axios-hooks";
import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { ESCROW_API_SERVICE_URL } from "../../../config";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";

export const CreatedOffers = () => {
  const [transactionSessionId, setTransactionSessionId] = useState<
    string | undefined
  >(undefined);

  const [{ loading }, cancelOffer] = useAxios<IPlainTransactionObject>(
    {
      url: `${ESCROW_API_SERVICE_URL}/offers/cancel`,
      method: "POST",
    },
    { manual: true }
  );

  const cancelOffersHandler = async (offerId: number) => {
    const { data: plainTransaction } = await cancelOffer({
      data: {
        offerId,
      },
    });

    if (plainTransaction) {
      const { session } = await sendTransactions({
        transactions: Transaction.fromPlainObject(plainTransaction),
        transactionDisplayInfo: {
          processingMessage: "Processing Cancel Transaction",
          errorMessage: "An error has occured during Cancel",
          successMessage: "Cancel transaction successful",
        },
        redirectAfterSign: false,
      });
      setTransactionSessionId(session);
    }
  };

  return (
    <Offers
      actionInProgress={loading}
      actionLable="Cancel"
      cardTitle="Created Offers"
      endpoint="/offers/created"
      actionCallback={cancelOffersHandler}
      transactionSessionId={transactionSessionId}
    />
  );
};
