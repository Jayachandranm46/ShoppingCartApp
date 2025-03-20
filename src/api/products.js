
export const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  

  export const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  };
  

  export const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };