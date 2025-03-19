import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import store from './src/redux/store';
import colors from './src/constants/colors';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from './src/Screens/ProductDetails';

const Stack=createStackNavigator()
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.ligthblue} />
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='main' component={BottomTabNavigator}/>
            <Stack.Screen name='ProductDetails' component={ProductDetailScreen}/>
          </Stack.Navigator>
    
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;