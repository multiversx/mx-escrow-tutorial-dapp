import useAxios from "axios-hooks";
import { ESCROW_API_SERVICE_URL } from "../config";
import { useEffect, useState } from "react";
import { Trim } from "@multiversx/sdk-dapp/UI";
import { Button } from "@material-tailwind/react";
import { formatByTokenId } from "../helpers";

export interface IOffersProps {
  endpoint: string;
  actionLable: string;
  actionCallback: (offerId: number) => void;
  actionInProgress?: boolean;
}

interface IOfferResponse {
  offerId: number;
  creator: string;
  offeredPayment: {
    amount: string;
    tokenIdentifier: string;
    nonce: number;
  };
  acceptedPayment: {
    amount: string;
    tokenIdentifier: string;
    nonce: number;
  };
  acceptedAddress: string;
}

export const useOffers = ({
  endpoint,
  actionLable,
  actionCallback,
  actionInProgress,
}: IOffersProps) => {
  const [{ data, loading, error }, getOffers] = useAxios<IOfferResponse[]>({
    url: `${ESCROW_API_SERVICE_URL}${endpoint}`,
    method: "GET",
  });

  const [tableRows, setTableRows] = useState<Array<JSX.Element[]>>([]);
  const [elementsCreated, setElementsCreated] = useState(false);

  useEffect(() => {
    if (data) {
      createTableElements(data);
    }
  }, [data, actionInProgress]);

  const createTableElements = async (data: IOfferResponse[]) => {
    const rows: Array<JSX.Element[]> = [];
    for (let dataRow of data) {
      const row = [
        <>{dataRow.offerId}</>,
        <Trim text={dataRow.creator} />,
        <>
          {await formatByTokenId(
            dataRow.offeredPayment.tokenIdentifier,
            dataRow.offeredPayment.amount
          )}
        </>,

        <>
          {dataRow.acceptedPayment.amount}
          {dataRow.acceptedPayment.tokenIdentifier}
        </>,
        <Trim text={dataRow.acceptedAddress} />,
        <Button
          placeholder={undefined}
          onClick={() => actionCallback(dataRow.offerId)}
          disabled={actionInProgress}
          size="sm"
          variant="outlined"
          color="blue-gray"
        >
          {actionLable}
        </Button>,
      ];
      rows.push(row);
    }
    setTableRows(rows);
    setElementsCreated(true);
  };

  return {
    tableRows,
    loading: (loading || !elementsCreated) && !error,
    error,
    refetch: getOffers,
  };
};
