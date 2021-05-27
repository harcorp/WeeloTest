import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import store from './Reducer/store';
import CurrenciesList from './features/currencies/CurrenciesList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CurrencyDetail from './features/currencies/CurrencyDetail';
import {CurrencyItem} from './features/currencies/models/CurrencyItem';

/**
 * Types of Root navigation
 */
export type RootStack = {
  List: undefined;
  Detail: {item: CurrencyItem};
};
/**
 * Create root stack navigator
 */
const Stack = createStackNavigator<RootStack>();

/**
 * App Component
 * Contain application
 * @constructor
 */
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={CurrenciesList} />
            <Stack.Screen name="Detail" component={CurrencyDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
