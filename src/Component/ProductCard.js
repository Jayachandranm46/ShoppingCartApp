import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, onAddToCart }) => {

  const navigation=useNavigation()
  return (
    <TouchableOpacity style={styles.card} onPress={()=>{
      navigation.navigate('ProductDetails',{selectedItem:product})
    }}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.badgeContainer}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(product)}
          >
            <Icon name="add-shopping-cart" size={22} color={Colors.cardBg} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // overflow: 'hidden',
    width: '48%',
  },
  image: {
    height: 140,
    width: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  discountBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: Colors.cardBg,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Colors.lightText,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 20,
  },
});

export default ProductCard;