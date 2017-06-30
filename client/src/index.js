import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import reducer from "./reducers/index";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// should remove devToolsEnhancer from prod builds
const store = createStore(reducer, devToolsEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
