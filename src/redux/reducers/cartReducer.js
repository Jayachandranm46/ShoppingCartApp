import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    CLEAR_CART,
  } from '../actions/cartActions';
  
  const initialState = {
    items: [],
    total: 0,
  };
  
  // Helper function to calculate total
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const product = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === product.id);
        
        let updatedItems;
        
        if (existingItemIndex >= 0) {
          // Item already in cart, increase quantity
          updatedItems = state.items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Add new item to cart
          updatedItems = [...state.items, { ...product, quantity: 1 }];
        }
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      
      case REMOVE_FROM_CART: {
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      
      case UPDATE_QUANTITY: {
        const { id, quantity } = action.payload;
        const updatedItems = state.items.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      
      case CLEAR_CART:
        return {
          ...state,
          items: [],
          total: 0,
        };
        
      default:
        return state;
    }
  };
  
  export default cartReducer;