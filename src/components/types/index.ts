export enum TokensTypeEnum {
  fungibleESDT = "FungibleESDT",
  nonFungibleESDT = "NonFungibleESDT",
  semiFungibleESDT = "SemiFungibleESDT",
  metaESDT = "MetaESDT",
}

export interface IToken {
  identifier: string;
  type: TokensTypeEnum;
  name: string;
  ticker: string;
  decimals: number;
  balance: string;
  nonce?: number;
  collection?: string;
}
