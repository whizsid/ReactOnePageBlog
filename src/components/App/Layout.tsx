import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import { AppState } from 'src/rootReducer';
import Drawer from './Layout/Drawer';
import Header from './Layout/Header';
import Snacks from './Layout/Snacks';

const styles = withStyles(({spacing})=>({
	app:{
		background:"#404040",
		margin:0,
		minHeight:"100vh",
		padding:0,
	},
	drawerClose:{
		paddingLeft:spacing.unit*14
	},
	drawerOpen:{
		paddingLeft:240+(spacing.unit*2)
	},
	wrapper:{
		paddingRight:spacing.unit*4,
		paddingTop:spacing.unit*14,
	}
}));

interface IProps{
	classes: {
		app:string,
		drawerClose:string,
		drawerOpen:string,
		wrapper:string
	},
	drawerOpen:boolean
};


const mapStateToProps = (state: AppState) => ({
	...state.layout
});

class Layout extends React.Component<IProps>{

	
	public render(){
		const {children,classes,drawerOpen} = this.props;

		return (
			<div className={classes.app} >
				<Header/>
				<Drawer/>
				<Snacks/>
				<div className={classNames(drawerOpen?classes.drawerOpen:classes.drawerClose,classes.wrapper)} >
					{children}
				</div>
			</div>
		)
	}
}


export default connect(mapStateToProps)( styles(Layout));