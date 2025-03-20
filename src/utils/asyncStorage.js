import AsyncStorage from '@react-native-async-storage/async-storage';


const ORDERS_KEY = '@shopping_app:orders';


export const saveOrder = async (cartItems, total) => {
  try {
    const orderNo = 'ORD-' + Date.now();

    const order = {
      orderNo,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    
    const existingOrdersJSON = await AsyncStorage.getItem(ORDERS_KEY);
    const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
    
    const updatedOrders = [order, ...existingOrders];
    
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    
    return order;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};


export const getOrders = async () => {
  try {
    const ordersJSON = await AsyncStorage.getItem(ORDERS_KEY);
    return ordersJSON ? JSON.parse(ordersJSON) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};


export const clearOrders = async () => {
  try {
    await AsyncStorage.removeItem(ORDERS_KEY);
  } catch (error) {
    console.error('Error clearing orders:', error);
  }
};