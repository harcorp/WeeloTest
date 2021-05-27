import axios from 'axios';
import {LIMIT_PAGE} from './constants/currencies.constant';

/**
 * Currencies Api
 * Include http request to api.
 * @constructor
 */
const CurrenciesApi = () => {
  /**
   * Initialize axios with default params
   */
  const apiAxios = axios.create({
    headers: {
      'Cache-Control': 'no-cache',
    },
    baseURL: 'https://api.coinlore.net/api',
    timeout: 15000,
  });

  /**
   * Get list of currencies
   * @param currentPage
   */
  const getExchanges = (currentPage: number) =>
    apiAxios.get('tickers', {
      params: {
        limit: LIMIT_PAGE,
        start: LIMIT_PAGE * (currentPage - 1),
      },
    });

  return {
    getExchanges,
  };
};

export default CurrenciesApi;
