import {hideLoading,showLoading} from 'react-redux-loading-bar';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import agent from 'src/agent';
import { errorSnack } from '../Layout/actions';
import {
	IPostLoadedAction, 
	IPostLoadingAction, 
	IPostMeta,
	IPostMetaLoadedAction,
	IPostMetaLoadingAction,
	LOADED_POST,
	LOADING_POST,
	META_DETAILS_LOADED,
	META_DETAILS_LOADING, 
} from './types';

export const loadingPost = (path:string):IPostLoadingAction=>({
	path,
	type:LOADING_POST,
});

export const loadedPost = (contents:string):IPostLoadedAction=>({
	contents,
	type:LOADED_POST,
});

export const fetchPost = (path:string): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
	dispatch(loadingPost(path));
	dispatch(showLoading());
	agent.Post.content(path).then((response)=>{
		dispatch(hideLoading());
		if(response.success){
			dispatch(loadedPost(response.data));
			dispatch(fetchMeta(path));
		} else {
			dispatch(errorSnack("කණගාටුයි. මෙම පිටුව ලිවීම තවමත් නිමා කර නොමැත."));
		}
	})
};

export const loadedMeta = (meta?:IPostMeta):IPostMetaLoadedAction=>({
	meta,
	type:META_DETAILS_LOADED,
})

export const loadingMeta = ():IPostMetaLoadingAction=>({
	type:META_DETAILS_LOADING
})

export const fetchMeta = (path:string): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
	dispatch(loadingMeta());
	dispatch(showLoading());
	agent.Post.meta(path).then(({success,time,next,previous,writers,seeAlso})=>{
		dispatch(hideLoading());
		if(success){
			dispatch(loadedMeta({time,next,previous,writers,seeAlso}));
		} else {
			dispatch(errorSnack("මෙම පිටුවට අදාළ කතෲන්ගේ තොරතුරු සොයා ගැනීමට නොහැක."));
		}
	})
}