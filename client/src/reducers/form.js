const form = (state = null, action) => {
  switch (action.type) {
    case "SYMBOL_NOT_FOUND":
      return "SYMBOL_NOT_FOUND";
    case "SYMBOL_ALREADY_EXIST":
      return "SYMBOL_ALREADY_EXIST";
    case "CHART_LOADING_START":
      return null;
    default:
      return state;
  }
};

export default form;
