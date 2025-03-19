import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductsScreen from '../Screens/ProductsScreen';
import CartScreen from '../Screens/CartScreen';
import OrdersHistoryScreen from '../Screens/OrdersHistoryScreen';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersHistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          ),
          title: "Orders History"
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.cardBg,
    elevation: 8,
    height: 60,
    paddingBottom: 5,
  },
  header: {
    backgroundColor: Colors.cardBg,
  },
  tabBarLabel: {
    fontWeight: '600',
  },
});

export default BottomTabNavigator;