
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import agent from '../../agent';
import {
	APP_CONFIRM_SNACK,
	APP_ERROR_SNACK,
	APP_INFO_SNACK,
	APP_SUCCESS_SNACK,
	APP_WARNING_SNACK,
	COLLAPSED_ITEM,
	DRAWER_CLOSE,
	DRAWER_OPEN,
	EXPANDED_ITEM,
	ICollapseMenuAction,
	IConfirmSnackAction,
	IDrawerCloseAction,
	IDrawerOpenAction,
	IErrorSnackAction,
	IExpandMenuAction,
	IInfoSnackAction,
	IMainMenuItemLoadedAction,
	IMainMenuItems,
	IMenuItemLoadedAction,
	IMenuItems,
	ISuccessSnackAction,
	IWarningSnackAction,
	MAIN_MENU_ITEM_LOADED,
	MENU_ITEM_LOADED
} from './types';


export const openDrawer = (): IDrawerOpenAction => ({
	type: DRAWER_OPEN
});

export const closeDrawer = (): IDrawerCloseAction => ({
	type: DRAWER_CLOSE
});

export const loadedMainMenu = (items: IMainMenuItems): IMainMenuItemLoadedAction => ({
	items,
	type: MAIN_MENU_ITEM_LOADED,
});

export const fetchMainMenuItems = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
	agent.Layout.mainMenuItem().then(({ success, message, items }) => {
		if (success) {
			const modedItems = {};

			for(const key in items){
				if(typeof key ==='string'){
					modedItems[key] = {
						...items[key],
						childrens:{},
						expanded:false,
						loaded:false,
						path:key
					};
				}
			}

			dispatch(loadedMainMenu(modedItems));
		}
		else {
			dispatch(errorSnack("Can not fetch menu items. Server Error. Please Refresh again your browser. Error:- " + message));
		}
	})
}

export const expandMenu = (path:string):IExpandMenuAction=>({
	path,
	type:EXPANDED_ITEM,
});

export const collapseMenu = (path:string):ICollapseMenuAction =>({
	path,
	type:COLLAPSED_ITEM,
});

export const loadedMenu = (path:string,items:IMenuItems):IMenuItemLoadedAction=>({
	items,
	path,
	type:MENU_ITEM_LOADED
});

export const fetchMenuItems = (path:string):ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
	agent.Layout.menuItem(path).then(({success,message,items})=>{
		if (success) {
			const modedItems = {};

			for(const key in items){
				if(typeof key ==='string'){
					modedItems[key] = {
						...items[key],
						childrens:{},
						expanded:false,
						loaded:false,
						path:path+"."+key
					};
				}
			}

			dispatch(loadedMenu(path,modedItems));
			dispatch(expandMenu(path));
		}
		else {
			dispatch(errorSnack("Can not fetch menu items. Server Error. Please Refresh again your browser. Error:- " + message));
		}
	})
}

export const errorSnack = (message: string, timeout = undefined): IErrorSnackAction => ({
	message,
	timeout,
	type: APP_ERROR_SNACK,
})

export const successSnack = (message: string, timeout = undefined): ISuccessSnackAction => ({
	message,
	timeout,
	type: APP_SUCCESS_SNACK,
});

export const warningSnack = (message: string, timeout = undefined): IWarningSnackAction => ({
	message,
	timeout,
	type: APP_WARNING_SNACK,
});

export const infoSnack = (message: string, timeout = undefined): IInfoSnackAction => ({
	message,
	timeout,
	type: APP_INFO_SNACK,
})

export const confirmSnack = (message: string, onCancel: () => void, onConfirm: () => void, timeout = undefined): IConfirmSnackAction => ({
	message,
	onCancel,
	onConfirm,
	timeout,
	type: APP_CONFIRM_SNACK,
})