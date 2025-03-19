import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    SET_SELECTED_CATEGORY,
  } from '../actions/productActions';
  
  const initialState = {
    products: [],
    categories: [],
    selectedCategory: '',
    loading: false,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
          loading: false,
        };
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
        };
      case SET_SELECTED_CATEGORY:
        return {
          ...state,
          selectedCategory: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;