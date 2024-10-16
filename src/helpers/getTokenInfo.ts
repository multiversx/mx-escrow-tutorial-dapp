import axios from "axios";
import { IToken, TokensTypeEnum } from "../components/types";
import { MX_API_SERVICE_URL } from "../config";

const tokenStorageKey = "tokens";

export const getTokenInfo = async (tokenId: string): Promise<IToken> => {
  const cachedTokens = localStorage.getItem(tokenStorageKey);
  let cachedTokensObject: { [index: string]: IToken } = {};

  try {
    cachedTokensObject = JSON.parse(cachedTokens || "");
  } catch {}

  if (cachedTokensObject[tokenId]) {
    return cachedTokensObject[tokenId];
  }

  try {
    const tokenData = await axios.get<IToken>(
      `${MX_API_SERVICE_URL}/tokens/${tokenId}`
    );
    cachedTokensObject[tokenId] = tokenData.data;
    localStorage.setItem(tokenStorageKey, JSON.stringify(cachedTokensObject));
    return cachedTokensObject[tokenId];
  } catch (error) {
    return {
      type: TokensTypeEnum.fungibleESDT,
      name: tokenId,
      ticker: tokenId,
      identifier: tokenId,
      decimals: 18,
      balance: "0",
    };
  }
};
