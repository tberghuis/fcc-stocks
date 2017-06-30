const loading = (state = {}, action) => {
  switch (action.type) {
    case "CHART_LOADING_START":
      return {
        ...state,
        [action.symbol]: 1
      };
    case "CHART_LOADING_FINISHED":
      let newState = { ...state };
      delete newState[action.symbol];
      return newState;
    default:
      return state;
  }
};

export default loading;
