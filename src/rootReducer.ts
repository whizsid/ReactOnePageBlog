import {combineReducers} from "redux";
import layout from './store/Layout/reducers';

const rootReducer =  combineReducers({
	layout
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;