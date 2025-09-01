const initialState = {
  users: [],
  products: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
