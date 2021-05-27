import {call, takeLatest, put} from 'redux-saga/effects';
import {getListRequest, getListSuccess, onError} from './CurrenciesActions';
import CurrenciesApi from './CurrenciesApi';
import RequestUtil from '../../utils/request.util';
import CurrencyAdapter from "./adapters/currency.adapter";

/**
 * Api instance to currencies
 */
const api = CurrenciesApi();

/**
 * Action to get list of currencies
 * @param api
 * @param action
 */
function* getExchangeList(api: any, action: any) {
  const {numberPage} = action.payload;
  const response = yield call(api.getExchanges, numberPage);
  if (RequestUtil.isBackendResponseOK(response)) {
    const data = response.data;
    const dataAdapted = CurrencyAdapter.adaptList(data.data);
    yield put(
      getListSuccess({
        list: dataAdapted,
        totalResults: data.info.coins_num,
        currentPage: numberPage,
      }),
    );
  } else {
    yield put(onError({value: response.message}));
  }
}

/**
 * Function to include all actions of current saga
 * @constructor
 */
function* CurrenciesSagas() {
  yield takeLatest(getListRequest.type, getExchangeList, api);
}

export default CurrenciesSagas;
