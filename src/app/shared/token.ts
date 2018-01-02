export interface Token {
  address: string;
  totalSupply: string;
  name: string;
  symbol: string;
  decimals: string;
  price: {
    rate: string;
    currency: string;
    diff: string;
    ts: string;
  };
  owner: string;
  countOps: string;
  totalIn: string;
  totalOut: string;
  holdersCount: string;
  issuanceCount: string;
}
