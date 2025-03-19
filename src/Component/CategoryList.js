import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === '' && styles.selectedCategory
          ]}
          onPress={() => onSelectCategory('')}
        
        >
          <Text 
            style={[
              styles.categoryText,
              selectedCategory === '' && styles.selectedCategoryText
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {categories.map((category,index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategory: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  categoryText: {
    color: Colors.text,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: Colors.cardBg,
  },
});

export default CategoryList;