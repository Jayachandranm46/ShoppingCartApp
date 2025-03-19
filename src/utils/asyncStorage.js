import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const ORDERS_KEY = '@shopping_app:orders';

// Save a new order to AsyncStorage
export const saveOrder = async (cartItems, total) => {
  try {
    // Generate unique order number
    const orderNo = 'ORD-' + Date.now();
    
    // Create order object
    const order = {
      orderNo,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    
    // Get existing orders
    const existingOrdersJSON = await AsyncStorage.getItem(ORDERS_KEY);
    const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
    
    // Add new order
    const updatedOrders = [order, ...existingOrders];
    
    // Save updated orders
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    
    return order;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

// Get all orders from AsyncStorage
export const getOrders = async () => {
  try {
    const ordersJSON = await AsyncStorage.getItem(ORDERS_KEY);
    return ordersJSON ? JSON.parse(ordersJSON) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Clear all orders (for testing)
export const clearOrders = async () => {
  try {
    await AsyncStorage.removeItem(ORDERS_KEY);
  } catch (error) {
    console.error('Error clearing orders:', error);
  }
};