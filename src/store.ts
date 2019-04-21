import { applyMiddleware,createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const createStoreWithMiddleware = applyMiddleware(
	createLogger(),
	thunk,
)(createStore);


export default createStoreWithMiddleware(rootReducer);
