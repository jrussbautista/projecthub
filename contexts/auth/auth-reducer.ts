const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOG_OUT":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
