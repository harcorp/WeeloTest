import {CurrencyItem} from '../models/CurrencyItem';

/**
 * Adapter for data of currencies
 */
export default class CurrencyAdapter {
  /**
   * Adapt list of currencies
   * @param rawList
   * @return CurrencyItem[]
   */
  static adaptList(rawList: any): CurrencyItem[] {
    const currencyList: CurrencyItem[] = [];
    Object.keys(rawList).forEach(rawKey => {
      currencyList.push(CurrencyAdapter.adaptItem(rawList[rawKey]));
    });
    return currencyList;
  }

  /**
   * Adapt item of currency
   * @param rawItem
   * @return CurrencyItem
   */
  static adaptItem(rawItem: any): CurrencyItem {
    const {
      id,
      name,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
      price_btc,
      price_usd,
      rank,
      symbol,
    } = rawItem || {};

    return {
      id,
      name,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
      price_btc,
      price_usd,
      rank,
      symbol,
    };
  }
}
