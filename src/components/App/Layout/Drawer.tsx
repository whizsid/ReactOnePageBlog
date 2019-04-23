import Divider from '@material-ui/core/Divider';
import { default as MuiDrawer } from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src/rootReducer';
import {  closeDrawer,collapseMenu,expandMenu ,fetchMainMenuItems, openDrawer } from 'src/store/Layout/actions';
import { IMainMenuItems } from 'src/store/Layout/types';
import DrawerMainMenuItem from './DrawerMainMenuItem';

const drawerWidth = 240;

const styles = withStyles(({ transitions, spacing, breakpoints }) => ({
	chevron:{
		margin:spacing.unit,
		padding:0,
	},
	drawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		width: drawerWidth,
	},
	drawerClose: {
		overflowX: 'hidden',
		transition: transitions.create('width', {
			duration: transitions.duration.leavingScreen,
			easing: transitions.easing.sharp,
		}),
		width: spacing.unit * 10 + 1,
		[breakpoints.up('sm')]: {
			width: spacing.unit * 11 + 1,
		},
	},
	drawerOpen: {
		transition: transitions.create('width', {
			duration: transitions.duration.enteringScreen,
			easing: transitions.easing.sharp,
		}),
		width: drawerWidth,
	},
	paper:{
		background:"#606060",
		paddingTop: spacing.unit * 12,
	}
}));

const mapStateToProps = (state: AppState) => ({
	...state.layout
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onCloseDrawer: () => dispatch(closeDrawer()),
	onCollapseMenu: (path:string)=>dispatch(collapseMenu(path)),
	onExpandMenu: (path:string)=>dispatch(expandMenu(path)),
	onLoadMainMenuItems: () => dispatch(fetchMainMenuItems()),
	onOpenDrawer: () => dispatch(openDrawer()),
});

interface IProps {
	classes: {
		chevron:string,
		drawer: string,
		drawerOpen: string,
		drawerClose: string,
		icon:string,
		paper:string
	},
	drawerOpen: boolean,
	onOpenDrawer: () => void,
	onCloseDrawer: () => void,
	menuItems: IMainMenuItems,
	onLoadMainMenuItems: ()=>void,
	onExpandMenu:(path:string)=>void,
	onCollapseMenu:(path:string)=>void
};

class Drawer extends React.Component<IProps> {

	constructor(props:IProps){
		super(props);

		props.onLoadMainMenuItems()
	}

	public render() {
		const { classes, drawerOpen } = this.props;

		return (
			<MuiDrawer
				variant="permanent"
				className={classNames(classes.drawer, {
					[classes.drawerOpen]: drawerOpen,
					[classes.drawerClose]: !drawerOpen,
				})}
				classes={{
					paper: classNames(classes.paper,{
						[classes.drawerOpen]: drawerOpen,
						[classes.drawerClose]: !drawerOpen,
					}),
				}}
				open={true}
			>
				<div>
					{this.renderChevronIcon()}
				</div>
				<Divider />
				<List>
					{this.renderMainItems()}
				</List>
			</MuiDrawer>
		);
	}
	
	protected handleExpandMoreClick = (path:string)=>(e:React.MouseEvent<HTMLElement,MouseEvent>)=>{
		e.preventDefault();

		const {onExpandMenu} = this.props;

		onExpandMenu(path);
	}

	protected handleExpandLessClick = (path:string)=>(e:React.MouseEvent)=>{
		e.preventDefault();

		const {onCollapseMenu} = this.props;

		onCollapseMenu(path);
	}

	protected renderChevronIcon() {
		const { drawerOpen, onOpenDrawer,classes } = this.props;

		if (drawerOpen) {
			return (
				<IconButton className={classes.chevron} onClick={this.closeDrawer}>
					<ChevronLeftIcon />
				</IconButton>
			);
		} else {
			return (
				<IconButton className={classes.chevron} onClick={onOpenDrawer}>
					<ChevronRightIcon />
				</IconButton>
			)
		}
	}

	protected renderMainItems(){
		const {menuItems,drawerOpen} = this.props;

		return Object.keys(menuItems).map(mainItemKey=>{
			const props = menuItems[mainItemKey];

			return (
				<DrawerMainMenuItem 
					key={mainItemKey} 
					{...props} 
					childrens={drawerOpen?props.childrens:undefined}
				/>
			)

		})
	}

	protected closeDrawer = ()=>{
		const {onLoadMainMenuItems,onCloseDrawer} = this.props;

		onLoadMainMenuItems();
		onCloseDrawer();
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(styles(Drawer));