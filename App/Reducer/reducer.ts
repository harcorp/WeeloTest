import currenciesReducer from '../features/currencies/CurrenciesReducer';
import {combineReducers} from '@reduxjs/toolkit';

/**
 * Combine all reducers
 */
const rootReducer = combineReducers({
  currencies: currenciesReducer,
});
/**
 * Root State types
 */
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
