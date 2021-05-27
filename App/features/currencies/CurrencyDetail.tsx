import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStack} from '../../App';
import {RouteProp} from '@react-navigation/native';
import FormattersUtil from '../../utils/formatters.util';

/**
 * Type of Route prop
 */
type DetailNavigationRouteProp = RouteProp<RootStack, 'Detail'>;

/**
 * Functional component with info item
 * @param title
 * @param value
 * @constructor
 */
function Item({title, value}: {title: string; value: string}) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

/**
 * Page detail of selected currency
 * @param route
 * @constructor
 */
function CurrencyDetail({route}: {route: DetailNavigationRouteProp}) {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <Item title="Name" value={item.name} />
      <Item title="Symbol" value={item.symbol} />
      <Item title="Perc. Change 24H" value={`%${item.percent_change_24h}`} />
      <Item title="Perc. Change 1H" value={`%${item.percent_change_1h}`} />
      <Item title="Perc. Change 7 days" value={`%${item.percent_change_7d}`} />
      <Item title="Ranking" value={`${item.rank}`} />
      <Item
        title="Price USD"
        value={FormattersUtil.formatCurrencyUSD(item.price_usd)}
      />
      <Item
        title="Price BTC"
        value={FormattersUtil.formatCurrencyBTC(item.price_btc)}
      />
    </View>
  );
}

/**
 * Local Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CurrencyDetail;
