import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import {getListRequest, resetLoading} from './CurrenciesActions';
import {connect} from 'react-redux';
import {RootState} from '../../Reducer/reducer';
import {CurrencyItem} from './models/CurrencyItem';
import FormattersUtil from '../../utils/formatters.util';
import {ImmutableArray} from 'seamless-immutable';
import {LIMIT_PAGE} from './constants/currencies.constant';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStack} from '../../App';

/**
 * Type of Navigation Prop for List Page
 */
type ListNavigationProp = StackNavigationProp<RootStack, 'List'>;

/**
 * Functional component to render list item of currencies
 * @param item
 * @param navigation
 * @constructor
 */
function Item({
  item,
  navigation,
}: {
  item: CurrencyItem;
  navigation: ListNavigationProp;
}) {
  // Callback when user press item
  const onPress = () => {
    navigation.navigate('Detail', {item});
  };

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.currencyName}>{item.name}</Text>
      <Text>{FormattersUtil.formatCurrencyUSD(item.price_usd)}</Text>
    </TouchableOpacity>
  );
}

/**
 * Functional component to render list footer
 * @param isLoading
 * @constructor
 */
function ListFooter({isLoading}: {isLoading: boolean}) {
  if (isLoading) {
    return (
      <View style={styles.loadingFooterContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return null;
}

/**
 * Page List of currencies
 * @param getList
 * @param currencyList
 * @param status
 * @param totalResult
 * @param resetLoading
 * @param navigation
 * @constructor
 */
export function CurrenciesList({
  getList,
  currencyList,
  status,
  totalResult,
  resetLoading,
  navigation,
}: {
  status: any;
  getList: (numberPage: number) => void;
  resetLoading: () => void;
  totalResult: number;
  currencyList: ImmutableArray<CurrencyItem>;
  navigation: ListNavigationProp;
}) {
  // Number of total pages
  const [totalPages, setTotalPages] = useState(0);
  // Number of current page
  const [currentPage, setCurrentPage] = useState(1);
  // Current value to filter list
  const [filterName, setFilterName] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      getList(currentPage);
    }
  }, [status, getList, currentPage]);

  useEffect(() => {
    setTotalPages(totalResult / LIMIT_PAGE);
  }, [totalResult]);

  const onEndList = () => {
    if (currentPage < totalPages) {
      resetLoading();
      setCurrentPage(prevState => prevState + 1);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={filterName || ''}
        placeholder="Search by name"
        onChangeText={val => setFilterName(val)}
      />
      <VirtualizedList
        data={
          filterName !== ''
            ? currencyList.filter(item =>
                item.name.toLowerCase().includes(filterName.toLowerCase()),
              )
            : currencyList
        }
        onEndReached={onEndList}
        onEndReachedThreshold={1}
        ListFooterComponent={() => (
          <ListFooter isLoading={status === 'loading'} />
        )}
        keyExtractor={(item: CurrencyItem) => `${item.id}`}
        getItem={(data, index) => data[index]}
        getItemCount={data => data.length}
        renderItem={({item}: any) => (
          <Item item={item} navigation={navigation} />
        )}
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
    backgroundColor: '#e0e0e0',
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32,
    flexDirection: 'row',
  },
  currencyName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchInput: {
    margin: 8,
    borderColor: '#aeaeae',
    borderWidth: 2,
    borderRadius: 4,
    padding: 8,
  },
  loadingFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

/**
 * Function to connect redux state to props
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  currencyList: state.currencies.currencyList,
  status: state.currencies.status,
  totalResult: state.currencies.totalResult,
});

/**
 * Function to connect actions to props
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  getList: (numberPage: number) =>
    dispatch(getListRequest({numberPage: numberPage})),
  resetLoading: () => dispatch(resetLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesList);
