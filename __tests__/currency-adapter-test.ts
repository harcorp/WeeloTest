import CurrencyAdapter from '../App/features/currencies/adapters/currency.adapter';

describe('Currency adapter service', () => {
  const rawList = [
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
  ];
  it('should adapt currency item and return value', () => {
    const currencyAdapted = CurrencyAdapter.adaptItem(rawList[0]);
    expect(currencyAdapted.id).toBe('90');
    expect(currencyAdapted.symbol).toBe('BTC');
    expect(currencyAdapted.name).toBe('Bitcoin');
    expect(currencyAdapted.rank).toBe(1);
    expect(currencyAdapted.price_usd).toBe('37543.62');
    expect(currencyAdapted.percent_change_24h).toBe('-4.60');
    expect(currencyAdapted.percent_change_1h).toBe('-0.02');
    expect(currencyAdapted.percent_change_7d).toBe('-5.98');
    expect(currencyAdapted.price_btc).toBe('1.00');
  });

  it('should adapt currencies', () => {
    const currenciesAdapted = CurrencyAdapter.adaptList(rawList);
    const item1 = currenciesAdapted[0];
    expect(item1.id).toBe('90');
    expect(item1.symbol).toBe('BTC');
    expect(item1.name).toBe('Bitcoin');
    expect(item1.rank).toBe(1);
    expect(item1.price_usd).toBe('37543.62');
    expect(item1.percent_change_24h).toBe('-4.60');
    expect(item1.percent_change_1h).toBe('-0.02');
    expect(item1.percent_change_7d).toBe('-5.98');
    expect(item1.price_btc).toBe('1.00');

    const item2 = currenciesAdapted[1];
    expect(item2.id).toBe('80');
    expect(item2.symbol).toBe('ETH');
    expect(item2.name).toBe('Ethereum');
    expect(item2.rank).toBe(2);
    expect(item2.price_usd).toBe('2679.32');
    expect(item2.percent_change_24h).toBe('-4.70');
    expect(item2.percent_change_1h).toBe('0.23');
    expect(item2.percent_change_7d).toBe('-7.01');
    expect(item2.price_btc).toBe('0.075122');
  });
});
