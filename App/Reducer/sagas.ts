import {all, fork} from 'redux-saga/effects';
import CurrenciesSagas from '../features/currencies/CurrenciesSagas';

/**
 * Root of sagas
 */
export default function* root() {
  try {
    yield all([fork(CurrenciesSagas)]);
  } catch (e) {
    console.log(e);
  }
}
