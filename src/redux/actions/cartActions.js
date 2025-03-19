export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

// Action to add a product to cart
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

// Action to remove a product from cart
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

// Action to update product quantity in cart
export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id: productId, quantity },
});

// Action to clear cart
export const clearCart = () => ({
  type: CLEAR_CART,
});