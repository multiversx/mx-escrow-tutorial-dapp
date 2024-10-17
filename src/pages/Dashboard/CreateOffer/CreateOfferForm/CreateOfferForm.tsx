import { object, string } from "yup";
import { addressIsValid } from "@multiversx/sdk-dapp/utils/account/addressIsValid";
import { Form, Formik } from "formik";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import useAxios from "axios-hooks";
import { IToken, TokensTypeEnum } from "../../../../components/types";
import { MX_API_SERVICE_URL } from "../../../../config";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { useEffect, useState } from "react";
import { formatByTokenId } from "../../../../helpers";
import { Loader } from "@multiversx/sdk-dapp/UI";

interface ICreateOfferFormProps {
  onSubmit: (values: ICreateOfferForm) => void;
  loading: boolean;
}

export interface ICreateOfferForm {
  offeredToken: string;
  offeredAmount: string;
  acceptedToken: string;
  acceptedAmount: string;
  acceptedAddress: string;
  acceptedNonce: number;
}

const initialValues: ICreateOfferForm = {
  offeredToken: "",
  offeredAmount: "",
  acceptedToken: "",
  acceptedAmount: "",
  acceptedAddress: "",
  acceptedNonce: 0,
};

const CreateOfferSchema = object().shape({
  offeredToken: string().required(),
  offeredAmount: string().required(),
  acceptedToken: string().required(),
  acceptedAddress: string()
    .required()
    .test(
      "is-valid-address",
      "Ivalid address",
      (value) => value === null || addressIsValid(value)
    ),
  acceptedAmount: string().required(),
});

export const CreateOfferForm = ({
  onSubmit,
  loading,
}: ICreateOfferFormProps) => {
  const { address } = useGetAccountInfo();
  const [{ data: tokensData, loading: tokensLoading }] = useAxios<IToken[]>({
    url: `${MX_API_SERVICE_URL}/accounts/${address}/tokens`,
    method: "GET",
  });

  const [formatedTokensData, setFromatedTokensData] = useState<IToken[] | null>(
    null
  );

  useEffect(() => {
    if (tokensData) {
      formatTokensData(tokensData);
    }
  }, [tokensData]);

  const formatTokensData = async (tokensData: IToken[]) => {
    for (const token of tokensData) {
      token.balance = await formatByTokenId(
        token.identifier,
        token.balance,
        false
      );
    }
    setFromatedTokensData(tokensData);
  };

  const [acceptedAddressIsValid, setAcceptedAddressIsValid] = useState(false);
  const [acceptedAddres, setAcceptedAddress] = useState("");

  const [{ data: nftsData, loading: nftsLoading }, getAcceptedAddressNfts] =
    useAxios<IToken[]>(
      {
        url: `${MX_API_SERVICE_URL}/accounts/${acceptedAddres}/nfts`,
        method: "GET",
      },
      { manual: true }
    );

  useEffect(() => {
    if (acceptedAddres) {
      getAcceptedAddressNfts();
    }
  }, [acceptedAddressIsValid, acceptedAddres]);

  const findNftById = (nftId: string) => {
    if (!nftsData) {
      return null;
    }

    return nftsData.find((nft) => nft?.collection === nftId);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CreateOfferSchema}
    >
      {({ errors, setFieldValue, values }) => (
        <Form>
          {formatedTokensData && (
            <div className="mt-4">
              <Select
                placeholder={undefined}
                error={Boolean(errors.offeredToken)}
                label="Offered Token"
                onChange={(value) => {
                  setFieldValue("offeredToken", value);
                }}
              >
                {formatedTokensData.map((token) => {
                  return (
                    <Option value={token.identifier}>
                      <div className="flex justify-between">
                        <div>{token.ticker || token.identifier}</div>
                        <div>
                          <strong>{token.balance}</strong>
                        </div>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </div>
          )}

          <div className="mt-4">
            <Input
              onChange={(event) => {
                setFieldValue("offeredAmount", event.currentTarget.value);
              }}
              placeholder={undefined}
              crossOrigin
              type="number"
              label="Offered Amount"
              error={Boolean(errors.offeredAmount)}
            />
          </div>

          <div className="mt-4">
            <Input
              placeholder={undefined}
              crossOrigin
              error={Boolean(errors.acceptedAddress)}
              label="Accepted Address"
              onChange={(event) => {
                setFieldValue("acceptedAddress", event.currentTarget.value);
                const isAddressValid = addressIsValid(
                  event.currentTarget.value
                );
                setAcceptedAddressIsValid(isAddressValid);
                setAcceptedAddress(
                  isAddressValid ? event.currentTarget.value : ""
                );
              }}
            />
          </div>

          {acceptedAddressIsValid && (
            <div>
              {nftsLoading || !nftsData ? (
                <Loader noText />
              ) : (
                <div>
                  <div className="mt-10">
                    <Select
                      placeholder={undefined}
                      error={Boolean(errors.acceptedToken)}
                      label="Accepted Token"
                      onChange={(value) => {
                        setFieldValue("acceptedToken", value);
                        if (!value) {
                          return;
                        }

                        const nftInfo = findNftById(value);
                        setFieldValue("acceptedNonce", nftInfo?.nonce);
                        setFieldValue(
                          "acceptedAmount",
                          nftInfo?.type === TokensTypeEnum.nonFungibleESDT
                            ? "1"
                            : values.acceptedAmount
                        );
                      }}
                    >
                      {nftsData.map((token) => {
                        return (
                          <Option value={token.collection}>
                            <div className="flex justify-between">
                              <div> {token.identifier} </div>
                              <div>
                                <strong>{token.balance || 1}</strong>
                              </div>
                            </div>
                          </Option>
                        );
                      })}
                    </Select>
                  </div>

                  <div className="mt-4">
                    <Input
                      placeholder={undefined}
                      error={Boolean(errors.acceptedAmount)}
                      crossOrigin
                      disabled={Boolean(
                        findNftById(values.acceptedToken)?.type ===
                          TokensTypeEnum.nonFungibleESDT
                      )}
                      type="number"
                      label="Accepted Amount"
                      onChange={(event) => {
                        setFieldValue(
                          "acceptedAmount",
                          event?.currentTarget.value
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center mt-2">
            <Button
              placeholder={undefined}
              variant="outlined"
              color="cyan"
              className="w-full"
              loading={loading}
              type="submit"
            >
              Create Offer
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
