const initialState = JSON.parse(localStorage.getItem("basketProducts")) || [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductId = state.findIndex(
        (elem) => elem.id === action.payload.id
      );
      if (existingProductId !== -1) {
        const updatedState = state.map((elem) => {
          if (elem.id === action.payload.id) {
            return { ...elem, quantity: elem.quantity + 1 };
          }
          return elem;
        });

        localStorage.setItem("basketProducts", JSON.stringify(updatedState));
        return updatedState;
      } else {
        const newProduct = { ...action.payload, quantity: 1 };
        const updatedState = [...state, newProduct];
        localStorage.setItem("basketProducts", JSON.stringify(updatedState));
        return updatedState;
      }

    case "DELETE_FROM_CART":
      const newState = state.filter((elem) => elem.id !== action.payload);
      localStorage.setItem("basketProducts", JSON.stringify([...newState]));
      return [...newState];
    case "CLEAR_BASKET":
      localStorage.removeItem("basketProducts");
      return []
    default:
      return state;
  }
};
export default cartReducer;
