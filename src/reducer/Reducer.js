const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload,isLoggedIn:true };
      case 'LOGOUT':
        return { ...state, user: null,isLoggedIn:false };
      case 'BOOK_APPOINTMENT':
        return { ...state, appointments: [...state.appointments, action.payload] };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default reducer
  