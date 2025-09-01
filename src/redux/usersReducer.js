const initialState = {
  users: [],
  products: [],
  filters: {
    price: { start: null, end: null },
    rating: null,
    gender: [],
    size: [],
  },
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
    case "SET_PRICE_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          price: {
            ...state.filters.price,
            start: action.payload[0],
            end: action.payload[1],
          },
        },
      };
    case "SET_RATING_FILTER":
      return {
        ...state,
        filters: { ...state.filters, rating: action.payload },
      };
    case "SET_GENDER_FILTER":
      return {
        ...state,
        filters: { ...state.filters, gender: action.payload },
      };
    case "SET_SIZE_FILTER":
      return {
        ...state,
        filters: { ...state.filters, size: action.payload },
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          price: {start:null,end:null},
          rating: null,
          size: [],
          gender: [],
        },
      };

    default:
      return state;
  }
};
