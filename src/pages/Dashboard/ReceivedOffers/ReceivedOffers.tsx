import { useState } from "react";
import { Offers } from "../../../components/Offers";
import useAxios from "axios-hooks";
import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { ESCROW_API_SERVICE_URL } from "../../../config";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";

export const ReceivedOffers = () => {
  const [transactionSessionId, setTransactionSessionId] = useState<
    string | undefined
  >(undefined);

  const [{ loading }, confirmOffer] = useAxios<IPlainTransactionObject>(
    {
      url: `${ESCROW_API_SERVICE_URL}/offers/confirm`,
      method: "POST",
    },
    { manual: true }
  );

  const confirmOfferHandler = async (offerId: number) => {
    const { data: plainTransaction } = await confirmOffer({
      data: {
        offerId,
      },
    });

    if (plainTransaction) {
      const { session } = await sendTransactions({
        transactions: Transaction.fromPlainObject(plainTransaction),
        transactionDisplayInfo: {
          processingMessage: "Processing Confirm Transaction",
          errorMessage: "An error has occured during Confirm",
          successMessage: "Confirm transaction successful",
        },
        redirectAfterSign: false,
      });
      setTransactionSessionId(session);
    }
  };

  return (
    <Offers
      actionInProgress={loading}
      actionLable="Confirm"
      cardTitle="Received Offers"
      endpoint="/offers/received"
      actionCallback={confirmOfferHandler}
      transactionSessionId={transactionSessionId}
    />
  );
};
