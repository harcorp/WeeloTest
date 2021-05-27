import {createAction} from '@reduxjs/toolkit';
import {CurrencyItem} from './models/CurrencyItem';

/**
 * Initialize get list of currencies request
 */
export const getListRequest = createAction<{numberPage: number}>(
  'GET_EXCHANGE_LIST_REQUEST',
);

/**
 * Process get list of currencies when result is successful
 */
export const getListSuccess = createAction<{
  list: CurrencyItem[];
  totalResults: number;
  currentPage: number;
}>('GET_EXCHANGE_LIST_SUCCESS');

/**
 * Action when has any error
 */
export const onError = createAction<{value: string}>('ON_ERROR');

/**
 * Reset loading to status to call again
 */
export const resetLoading = createAction('RESET_LOADING');
