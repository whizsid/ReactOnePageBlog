import { 
	IPostStates, 
	LOADED_POST,
	LOADING_POST, 
	META_DETAILS_LOADED,
	META_DETAILS_LOADING, 
	PostActionTypes,
} from "./types";

const initialState :IPostStates = {
	contents:"#තොරතුරු සැකසෙමින් පවතී... මදක් රැ්‍දී සිටින්න",
	loading:true,
	meta:undefined,
	metaLoading:true,
	path:"",
};

export default (state=initialState,action:PostActionTypes):IPostStates=>{
	switch (action.type) {
		case LOADING_POST:
			return {
				...state,
				loading:true,
				path:action.path
			};
		case LOADED_POST:
			return {
				...state,
				contents:action.contents,
				loading:false
			};
		case META_DETAILS_LOADING:
			return {
				...state,
				meta:undefined,
				metaLoading:true,
			}
		case META_DETAILS_LOADED:
			return {
				...state,
				meta:action.meta,
				metaLoading:false,
			}
		default:
			return state;
	}
}