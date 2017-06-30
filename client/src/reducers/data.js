const data = (state = {}, action) => {
  switch (action.type) {
    case "RECIEVE_STOCK_DATA":
      // trick from https://stackoverflow.com/questions/35592078/cleaner-shorter-way-to-update-nested-state-in-redux
      return {
        ...state,
        [action.data.symbol]: {
          ...state[action.data.symbol],
          ...action.data
        }
      };
    case "REMOVE_SYMBOL":
      let newState = {
        ...state
      };
      delete newState[action.symbol];
      return newState;
    default:
      return state;
  }
};

export default data;
