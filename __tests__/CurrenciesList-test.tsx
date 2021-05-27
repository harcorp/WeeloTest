import React from 'react';
import rendered from 'react-test-renderer';
import {Text, TouchableOpacity} from 'react-native';
import {CurrenciesList} from '../App/features/currencies/CurrenciesList';
import CurrencyAdapter from '../App/features/currencies/adapters/currency.adapter';

describe('Currency list component', () => {
  const navigation: any = {navigate: jest.fn()};
  const list: any = CurrencyAdapter.adaptList([
    {
      id: '90',
      symbol: 'BTC',
      name: 'Bitcoin',
      nameid: 'bitcoin',
      rank: 1,
      price_usd: '37543.62',
      percent_change_24h: '-4.60',
      percent_change_1h: '-0.02',
      percent_change_7d: '-5.98',
      price_btc: '1.00',
      market_cap_usd: '700656013584.76',
      volume24: 60427491575.086174,
      volume24a: 65756959901.888214,
      csupply: '18662452.00',
      tsupply: '18662452',
      msupply: '21000000',
    },
    {
      id: '80',
      symbol: 'ETH',
      name: 'Ethereum',
      nameid: 'ethereum',
      rank: 2,
      price_usd: '2679.32',
      percent_change_24h: '-4.70',
      percent_change_1h: '0.23',
      percent_change_7d: '-7.01',
      price_btc: '0.075122',
      market_cap_usd: '308586858309.20',
      volume24: 48645488294.694534,
      volume24a: 73306573230.39163,
      csupply: '115173595.00',
      tsupply: '115173595',
      msupply: '',
    },
  ]);
  const resetLoading = jest.fn();
  const getList = jest.fn();

  it('should create an instance of the component', () => {
    const CurrencyListComponent = rendered.create(
      <CurrenciesList
        getList={getList}
        currencyList={list}
        status={'iddle'}
        navigation={navigation}
        resetLoading={resetLoading}
        totalResult={0}
      />,
    );
    expect(CurrencyListComponent).not.toBeUndefined();
  });

  it('should render correct data', () => {
    const CurrencyListComponent = rendered.create(
      <CurrenciesList
        getList={getList}
        currencyList={list}
        status={'iddle'}
        navigation={navigation}
        resetLoading={resetLoading}
        totalResult={list.length}
      />,
    );

    const textComponents = CurrencyListComponent.root.findAllByType(Text);
    expect(textComponents[0].props.children).toBe('Bitcoin');
    expect(textComponents[1].props.children).toBe('USD 37,543.62');
    expect(textComponents[2].props.children).toBe('Ethereum');
    expect(textComponents[3].props.children).toBe('USD 2679.32');
  });

  it('validate click into item', () => {
    const CurrencyListComponent = rendered.create(
      <CurrenciesList
        getList={getList}
        currencyList={list}
        status={'iddle'}
        navigation={navigation}
        resetLoading={resetLoading}
        totalResult={list.length}
      />,
    );

    const textComponents =
      CurrencyListComponent.root.findAllByType(TouchableOpacity);
    textComponents.forEach(component => {
      component.props.onPress();
    });

    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledTimes(2);
  });
});
