export const LOADING_POST = 'LOADING_POST';
export const LOADED_POST = 'LOADED_POST';

export interface IPostLoadingAction {
	type: typeof LOADING_POST,
	path:string
};

export interface IPostLoadedAction {
	type: typeof LOADED_POST,
	contents: string
};

// Meta details
export const META_DETAILS_LOADED = 'META_DETAILS_LOADED';
export const META_DETAILS_LOADING = 'META_DETAILS_LOADING';

export interface IPostMetaDetail {
	link:string,
	title:string,
};

export interface IPostMetaWriter {
	avatar:string,
	name:string,
	username:string
};

export interface IPostMeta {
	next?:IPostMetaDetail,
	previous?:IPostMetaDetail,
	time:string,
	writers?: IPostMetaWriter[],
	seeAlso?:IPostMetaDetail[]
};

export interface IPostMetaLoadedAction {
	meta?:IPostMeta,
	type: typeof META_DETAILS_LOADED,
}

export interface IPostMetaLoadingAction {
	type: typeof META_DETAILS_LOADING
}

export interface IPostStates {
	contents:string,
	loading:boolean,
	meta?:IPostMeta,
	metaLoading:boolean,
	path:string,
};

export type PostActionTypes = 
	IPostLoadedAction|
	IPostLoadingAction|
	IPostMetaLoadedAction|
	IPostMetaLoadingAction;