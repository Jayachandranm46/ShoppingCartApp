import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/colors';

const OrderItem = ({ order, expanded, onToggleExpand }) => {
  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.orderCard}>
      <TouchableOpacity onPress={onToggleExpand} style={styles.header}>
        <View>
          <Text style={styles.orderNo}>{order.orderNo}</Text>
          <Text style={styles.date}>{formatDate(order.date)}</Text>
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.total}>${order.total.toFixed(2)}</Text>
          <Icon 
            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={24} 
            color={Colors.primary} 
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.detailsContainer}>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.grandTotal}>${order.total.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  elevation:5,
  shadowRadius:10
   
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primary,
  },
  date: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 4,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.text,
    marginRight: 8,
  },
  detailsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  itemQuantity: {
    width: 30,
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default OrderItem;