const AuthReducer = (state, action)=>{
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          user: null,
          isFetching: false,
          error: action.payload,
        };
      case "LOGOUT_SUCCESS":
        return {
          cart: {},
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [...state.cart, action.payload.product],
        };
      case "UPDATE_CART":
        return {
          cart:null,
          ...state,
          
        };
      default:
        return state;
    }
};
export default AuthReducer;