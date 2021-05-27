import {createReducer, current} from '@reduxjs/toolkit';
import {
  getListRequest,
  getListSuccess,
  onError,
  resetLoading,
} from './CurrenciesActions';
import Immutable from 'seamless-immutable';
import {CurrencyItem} from './models/CurrencyItem';

/**
 * Interface of currencies state
 */
interface CurrencyState {
  currencyList: CurrencyItem[];
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  totalResult: number;
}

/**
 * Inital state immutable for currencies
 */
const InitialState = Immutable<CurrencyState>({
  currencyList: [],
  error: null,
  status: 'idle',
  totalResult: 0,
});

/**
 * Currencies reducer
 */
export const currenciesReducer = createReducer(InitialState, builder => {
  builder
    .addCase(getListRequest, state => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getListSuccess, (state, action) => {
      const currentState = current(state);
      state.status = 'succeeded';
      state.error = null;
      if (action.payload.currentPage > 1) {
        state.currencyList = Immutable([
          ...currentState.currencyList.asMutable(),
          ...action.payload.list,
        ]);
      } else {
        state.currencyList = Immutable(action.payload.list);
      }
      state.totalResult = action.payload.totalResults;
    })
    .addCase(resetLoading, state => {
      state.status = 'idle';
    })
    .addCase(onError, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.value;
    })
    .addDefaultCase(() => {});
});

export default currenciesReducer;
