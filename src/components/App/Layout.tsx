import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import Header from './Header/Header';

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
				{children}
			</div>
		)
	}
}


export default styles(Layout);