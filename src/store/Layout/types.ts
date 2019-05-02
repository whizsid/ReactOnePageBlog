// Drawer types
export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const MAIN_MENU_ITEM_LOADED = 'MAIN_MENU_ITEM_LOADED';
export const EXPANDED_ITEM = 'EXPANDED_ITEM';
export const COLLAPSED_ITEM = 'COLLAPSED_ITEM';
export const MENU_ITEM_LOADED = 'MENU_ITEM_LOADED';

export interface IMenuItem {
	childrens?: IMenuItems,
	description:string,
	title:string,
	link?:string,
	loaded:boolean,
	expanded:boolean,
	path:string
}

export interface IMenuItems {
	[x:string]:IMenuItem
}

export interface IMainMenuItem extends IMenuItem {
	icon?:string
}

export interface IMainMenuItems {
	[x:string]:IMainMenuItem
}

export interface IDrawerOpenAction {
	type: typeof DRAWER_OPEN
};

export interface IDrawerCloseAction {
	type: typeof DRAWER_CLOSE
};

export interface IMainMenuItemLoadedAction {
	type: typeof MAIN_MENU_ITEM_LOADED,
	items: IMainMenuItems
};

export interface IExpandMenuAction {
	type: typeof EXPANDED_ITEM,
	path: string
};

export interface ICollapseMenuAction {
	type: typeof COLLAPSED_ITEM,
	path: string
};

export interface IMenuItemLoadedAction {
	type: typeof MENU_ITEM_LOADED,
	path: string,
	items: IMenuItems
};

// Snack types
export const APP_WARNING_SNACK ='APP_WARNING_SNACK';
export const APP_SUCCESS_SNACK ='APP_SUCCESS_SNACK';
export const APP_ERROR_SNACK = 'APP_ERROR_SNACK';
export const APP_CONFIRM_SNACK = 'APP_CONFIRM_SNACK';
export const APP_INFO_SNACK = 'APP_INFO_SNACK';
export const APP_CLOSE_SNACK = 'APP_CLOSE_SNACK';

export interface ISnack {
	index:number,
	message: string,
	onConfirm?:() => void,
	onCancel?:() => void,
	open:boolean,
	time:number,
	timeout?:number,
	type:"error"|"success"|"info"|"confirm"|"warning",
}

export interface IBaseSnackAction {
	message: string,
	timeout?:number,
}

export interface IInfoSnackAction extends IBaseSnackAction {
	type: typeof APP_INFO_SNACK
}

export interface IErrorSnackAction extends IBaseSnackAction {
	type: typeof APP_ERROR_SNACK
}

export interface ISuccessSnackAction extends IBaseSnackAction {
	type: typeof APP_SUCCESS_SNACK
}

export interface IWarningSnackAction extends IBaseSnackAction {
	type: typeof APP_WARNING_SNACK
}

export interface IConfirmSnackAction extends IBaseSnackAction {
	onCancel:() => void,
	onConfirm:() => void,
	type: typeof APP_CONFIRM_SNACK
}

export interface ICloseSnackAction {
	snack:ISnack,
	type:typeof APP_CLOSE_SNACK,
};

export interface ILayoutState {
	drawerOpen:boolean,
	menuItems:IMainMenuItems,
	nextSnackIndex:number,
	snacks:ISnack[],
}

export type LayoutActionTypes =
	IDrawerCloseAction | 
	IDrawerOpenAction | 
	IMainMenuItemLoadedAction |
	IInfoSnackAction |
	IErrorSnackAction |
	ISuccessSnackAction |
	IWarningSnackAction |
	IConfirmSnackAction |
	IExpandMenuAction |
	ICollapseMenuAction |
	IMenuItemLoadedAction |
	ICloseSnackAction;
