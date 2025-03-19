// Function to fetch products from the API
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
  
  // Function to fetch products by category
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
  
  // Function to fetch all categories
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