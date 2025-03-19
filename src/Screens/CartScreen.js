import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { removeFromCart, updateQuantity, clearCart } from '../redux/actions/cartActions';
import { saveOrder } from '../utils/asyncStorage';
import Colors from '../constants/colors';
import colors from '../constants/colors';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity(id, quantity));
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart first.');
      return;
    }

    try {
      const order = await saveOrder(items, total);
      
      // Show success message
      Alert.alert(
        'Order Completed',
        `Your order ${order.orderNo} has been placed successfully.`,
        [
          {
            text: 'View Orders',
            onPress: () => {
              dispatch(clearCart());
              navigation.navigate('Orders');
            },
          },
          {
            text: 'Continue Shopping',
            onPress: () => {
              dispatch(clearCart());
              navigation.navigate('Products');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to complete checkout. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
        >
          <Icon name="remove" size={22} color={Colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
        >
          <Icon name="add" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTotalPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Icon name="delete" size={24} color={Colors.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-cart" size={80} color={Colors.lightText} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.shopButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
        <View>
          <Text style={{fontSize:20,color:colors.textcolor,marginHorizontal:25,marginVertical:10}}>My Cart</Text>
        </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items:</Text>
              <Text style={styles.summaryValue}>
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Price:</Text>
              <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
              <Icon name="arrow-forward" size={24} color={Colors.cardBg} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 15,
  
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.lightText,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: Colors.background,
    borderRadius: 15,
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: 12,
  },
  itemTotalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    width: 60,
    textAlign: 'right',
  },
  removeButton: {
    marginLeft: 15,
  },
  summaryContainer: {
    backgroundColor: Colors.cardBg,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  summaryValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.cardBg,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.lightText,
    marginTop: 15,
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shopButtonText: {
    color: Colors.cardBg,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;