import useAxios from "axios-hooks";
import { Card } from "../../../components/Card";
import { CreateOfferForm, ICreateOfferForm } from "./CreateOfferForm";
import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { ESCROW_API_SERVICE_URL } from "../../../config";
import { parseByTokenId } from "../../../helpers";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";

export const CreateOffer = () => {
  const [{ loading }, createOffer] = useAxios<IPlainTransactionObject>(
    {
      url: `${ESCROW_API_SERVICE_URL}/offers/create`,
      method: "POST",
    },
    { manual: true }
  );

  const onSubmit = async (values: ICreateOfferForm) => {
    const { data: plainTransaction } = await createOffer({
      data: {
        ...values,
        offeredAmount: await parseByTokenId(
          values.offeredToken,
          values.offeredAmount
        ),
      },
    });

    if (plainTransaction) {
      await sendTransactions({
        transactions: Transaction.fromPlainObject(plainTransaction),
        transactionDisplayInfo: {
          processingMessage: "Processing Create transaction",
          errorMessage: "An error has occured during Create",
          successMessage: "Create transaction successful",
        },
        redirectAfterSigning: false,
      });
    }
  };

  return (
    <Card title="Create Offer" subtitle="">
      <div className="flex justify-center p-2 ">
        <div className="w-full md:w-5/6 ">
          <CreateOfferForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </Card>
  );
};
