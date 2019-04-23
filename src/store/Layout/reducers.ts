import { set } from 'lodash';
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
	IBaseSnackAction,
	ILayoutState,
	LayoutActionTypes,
	MAIN_MENU_ITEM_LOADED,
	MENU_ITEM_LOADED,
} from './types';

const initialState: ILayoutState = {
	drawerOpen: false,
	menuItems: {},
	snacks: []
};

const generateSnackState = (state: ILayoutState, action: IBaseSnackAction, type: "error" | "success" | "warning" | "info" | "confirm"): ILayoutState => (
	{
		...state,
		snacks: [
			...state.snacks,
			{
				message: action.message,
				open: true,
				time: (new Date).getTime(),
				timeout: action.timeout,
				type,
			}
		]
	}
)

const updateDeeply = (originalVariable:any,path:string,value:any)=>set(JSON.parse(JSON.stringify(originalVariable)),path,value);

export default (state = initialState, action: LayoutActionTypes): ILayoutState => {
	switch (action.type) {
		case DRAWER_OPEN:
			return {
				...state,
				drawerOpen: true
			};
		case DRAWER_CLOSE:
			return {
				...state,
				drawerOpen: false
			};
		case MAIN_MENU_ITEM_LOADED:
			return {
				...state,
				menuItems: {...action.items}
			};
		case EXPANDED_ITEM:
			const menuItemsE = state.menuItems;
			return {
				...state,
				menuItems:updateDeeply(menuItemsE,action.path.split('.').join('.childrens.')+".expanded",true)
			};
		case COLLAPSED_ITEM:
			const menuItemsC = state.menuItems;
			return {
				...state,
				menuItems:updateDeeply(menuItemsC,action.path.split('.').join('.childrens.')+".expanded",false)
			};
		case MENU_ITEM_LOADED:
			const menuItemsL = updateDeeply(state.menuItems,action.path.split('.').join('.childrens.')+".childrens",action.items);

			return {
				...state,
				menuItems:updateDeeply(menuItemsL,action.path.split('.').join('.childrens.')+".loaded",true)
			};
		case APP_SUCCESS_SNACK:
			return generateSnackState(state, action, "success");
		case APP_ERROR_SNACK:
			return generateSnackState(state, action, "error");
		case APP_WARNING_SNACK:
			return generateSnackState(state, action, "warning");
		case APP_INFO_SNACK:
			return generateSnackState(state, action, "info");
		case APP_CONFIRM_SNACK:
			return {
				...state,
				snacks: [
					...state.snacks,
					{
						message: action.message,
						onCancel:action.onCancel,
						onConfirm:action.onConfirm,
						open: true,
						time: (new Date).getTime(),
						timeout: action.timeout,
						type:"confirm",
					}
				]
			};
		default:
			return state;
	}
}