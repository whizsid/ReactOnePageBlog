import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import {connect} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src/rootReducer';
import { collapseMenu, expandMenu, fetchMenuItems } from 'src/store/Layout/actions';
import laravelcon from '../../../resources/laravel.svg';
import reactIcon from '../../../resources/react.svg';
import {DrawerMenuItem} from './DrawerMenuItem';

const drawerIcons = {
	laravel:laravelcon,
	react:reactIcon
}

const styles = withStyles(({spacing})=>({
	icon:{
		height:spacing.unit*5,
		width:spacing.unit*5,
	}
}))


const mapStateToProps = (state:AppState)=>({
	...state.layout
});

const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},any>)=>({
	onCollapseMenu: (path:string)=>dispatch(collapseMenu(path)),
	onExpandMenu: (path:string)=>dispatch(expandMenu(path)),
	onLoadMenu: (path:string)=>dispatch(fetchMenuItems(path))
});


class DrawerMainMenuItem extends DrawerMenuItem {
	public render(){
		const { title } = this.props;

		return (
			<React.Fragment>
				<ListItem divider={true} dense={true} >
					{this.renderIcon()}
					<ListItemText primary={title} />
					{this.renderExpandIcon()}
				</ListItem>
				{this.renderChildrens()}
			</React.Fragment>
		)
	}

	protected renderIcon(){
		const {classes,icon} = this.props;

		if(typeof icon ==='undefined'){
			return null
		};

		return (
			<ListItemIcon>
				<img className={classes.icon} src={drawerIcons[icon]}/>
			</ListItemIcon>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)( styles (DrawerMainMenuItem));