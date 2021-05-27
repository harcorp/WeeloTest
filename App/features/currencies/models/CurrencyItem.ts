/**
 * Model of currency item
 */
export interface CurrencyItem {
  id: number;
  symbol: string;
  name: string;
  rank: number;
  price_usd: number;
  percent_change_24h: number;
  percent_change_1h: number;
  percent_change_7d: number;
  price_btc: number;
}
