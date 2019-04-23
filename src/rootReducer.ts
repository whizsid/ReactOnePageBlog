import { loadingBarReducer } from 'react-redux-loading-bar'
import {combineReducers} from "redux";
import layout from './store/Layout/reducers';

const rootReducer =  combineReducers({
	layout,
	loadingBar: loadingBarReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;