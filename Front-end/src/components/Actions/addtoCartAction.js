export const addProduct = (products) => {
  return { type: "ADD_TO_CART", payload: products };
};

export const deleteProduct = (id) => {
  return { type: "DELETE_FROM_CART", payload: id };
};

export const clearBasket = () => {
  return { type: "CLEAR_BASKET" }
}