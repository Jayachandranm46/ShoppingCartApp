import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { getOrders } from '../utils/asyncStorage';
// import OrderItem from '../components/OrderItem';
import Colors from '../constants/colors';
import OrderItem from '../Component/OrderItem';
import colors from '../constants/colors';

const OrdersHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getOrders();
      console.log('ordersData',ordersData);
      
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const toggleOrderExpand = (orderNo) => {
    setExpandedOrderId(expandedOrderId === orderNo ? null : orderNo);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.secondary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No orders history found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
              <TouchableOpacity style={{marginHorizontal:18,marginVertical:10}}>
                
                <Text style={{color:colors.textcolor,fontSize:23}}>Orders history</Text>
                
              </TouchableOpacity>
            </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderNo}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            expanded={expandedOrderId === item.orderNo}
            onToggleExpand={() => toggleOrderExpand(item.orderNo)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.secondary]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 15,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.lightText,
  },
});

export default OrdersHistoryScreen;