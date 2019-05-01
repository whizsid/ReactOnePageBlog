import { loadingBarReducer } from 'react-redux-loading-bar';
import {combineReducers} from "redux";
import layout from './store/Layout/reducers';
import post from './store/Post/reducers';

const rootReducer =  combineReducers({
	layout,
	loadingBar:loadingBarReducer,
	post,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;