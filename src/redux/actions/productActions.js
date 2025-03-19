import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../../api/products';

export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

// Action to fetch all products
export const getProducts = () => {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_START });
    
    try {
      const productsData = await fetchProducts();
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: productsData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Action to fetch products by category
export const getProductsByCategory = (category) => {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_START });
    
    try {
      const productsData = await fetchProductsByCategory(category);
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: productsData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Action to fetch all categories
export const getCategories = () => {
  return async dispatch => {
    try {
      const categoriesData = await fetchCategories();
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categoriesData,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
};

// Action to set selected category
export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});