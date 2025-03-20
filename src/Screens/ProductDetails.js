// screens/ProductDetailScreen.js
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

const ProductDetailScreen = ({navigation}) => {
    const routes=useRoute()?.params?.selectedItem
    const product=routes
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginHorizontal:18,marginVertical:10}}>
          
        <Icon2 name="arrowleft" size={25} color="#000" />
          
        </TouchableOpacity>
      </View>
      <ScrollView>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>{product.rating}</Text>
        </View>

        <Text style={styles.stock}>{product.availabilityStatus}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <Text style={styles.sectionText}>{product.shippingInformation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Warranty Information</Text>
          <Text style={styles.sectionText}>{product.warrantyInformation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Return Policy</Text>
          <Text style={styles.sectionText}>{product.returnPolicy}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
  },
  stock: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProductDetailScreen;