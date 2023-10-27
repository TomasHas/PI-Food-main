import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers =
//   (typeof window !== "undefined" && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) ||
//   compose;

const store = createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(thunk))
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
