import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  getCategories,
  setSelectedCategory,
  getProductsByCategory,
} from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import Colors from '../constants/colors';
import CategoryList from '../Component/CategoryList';
import ProductCard from '../Component/ProductCard';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { products, categories, selectedCategory, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  
  }, [dispatch]);


  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    
    if (category === '') {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByCategory(category?.slug));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.container}>
       <View style={{width:'100%',backgroundColor:colors.white,
       marginVertical:20,
        flexDirection:'row',
       justifyContent:'space-between',
      //  marginHorizontal:20,
      alignItems:'center'
       }}>
          <View style={{marginHorizontal:20}}>
            <Text style={{color:colors.textcolor,fontSize:20}}>Products</Text>
          </View>
       
          <TouchableOpacity style={{flexDirection:'row',marginHorizontal:10}} onPress={()=>navigation.navigate('Cart')}>  
            <Icon name="shopping-cart" color={'C5CDD2'} size={20} />
          </TouchableOpacity>
       </View>

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => 
            (
            <ProductCard product={item} onAddToCart={handleAddToCart} />
          )}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  productsList: {
    padding: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.lightText,
  },
});

export default ProductsScreen;