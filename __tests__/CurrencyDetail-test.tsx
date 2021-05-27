import React from 'react';
import rendered from 'react-test-renderer';
import CurrencyDetail from '../App/features/currencies/CurrencyDetail';
import CurrencyAdapter from '../App/features/currencies/adapters/currency.adapter';
import {Text} from 'react-native';

describe('Currency detail component', () => {
  const route: any = {
    params: {
      item: CurrencyAdapter.adaptItem({
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
      }),
    },
  };
  it('should create an instance of the component', () => {
    const CurrencyDetailComponent = rendered.create(
      <CurrencyDetail route={route} />,
    );
    expect(CurrencyDetailComponent).not.toBeUndefined();
  });

  it('should render correct data', () => {
    const CurrencyDetailComponent = rendered.create(
      <CurrencyDetail route={route} />,
    );

    const textComponents = CurrencyDetailComponent.root.findAllByType(Text);
    expect(textComponents[0].props.children).toBe('Name');
    expect(textComponents[1].props.children).toBe('Bitcoin');
    expect(textComponents[2].props.children).toBe('Symbol');
    expect(textComponents[3].props.children).toBe('BTC');
    expect(textComponents[4].props.children).toBe('Perc. Change 24H');
    expect(textComponents[5].props.children).toBe('%-4.60');
    expect(textComponents[6].props.children).toBe('Perc. Change 1H');
    expect(textComponents[7].props.children).toBe('%-0.02');
    expect(textComponents[8].props.children).toBe('Perc. Change 7 days');
    expect(textComponents[9].props.children).toBe('%-5.98');
    expect(textComponents[10].props.children).toBe('Ranking');
    expect(textComponents[11].props.children).toBe('1');
    expect(textComponents[12].props.children).toBe('Price USD');
    expect(textComponents[13].props.children).toBe('USD 37,543.62');
    expect(textComponents[14].props.children).toBe('Price BTC');
    expect(textComponents[15].props.children).toBe('BTC 1.000000');
  });
});
