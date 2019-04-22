import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import Drawer from './Layout/Drawer';
import Header from './Layout/Header';

const styles = withStyles(()=>({
	app:{
		background:"#404040",
		margin:0,
		minHeight:"100vh",
		padding:0,
	}
}));

interface IProps{
	classes: {
		app:string
	}
};

class Layout extends React.Component<IProps>{
	public render(){
		const {children,classes} = this.props;

		return (
			<div className={classes.app} >
				<Header/>
				<Drawer/>
				{children}
			</div>
		)
	}
}


export default styles(Layout);