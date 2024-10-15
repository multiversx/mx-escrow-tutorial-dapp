import { getTokenInfo } from "./getTokenInfo";
import { formatAmount } from "@multiversx/sdk-dapp/utils/operations/formatAmount";

export const formatByTokenId = async (
  tokenId: string,
  amount: string,
  showName = true
) => {
  const tokenData = await getTokenInfo(tokenId);
  const formatedAmount = formatAmount({
    input: amount,
    decimals: tokenData.decimals,
  });
  return `${formatedAmount} ${showName ? tokenData.ticker || tokenId : ""}`;
};
