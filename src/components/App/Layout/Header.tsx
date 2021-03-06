import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import LoadingBar from 'react-redux-loading-bar'
import {Link} from 'react-router-dom';
import githubIcon from "../../../resources/github.svg";
import logo from "../../../resources/logo.svg";

const styles = withStyles(({spacing})=>({
	avatar:{
		"&:hover":{
			background:"#f0f0f0",
			borderRadius: spacing.unit,
			height: spacing.unit*12,
			marginLeft:-spacing.unit,
			top:0,
			width: spacing.unit*12,
		},
		background:"#fff",
		left: spacing.unit,
		marginLeft:spacing.unit*2,
		position: "fixed",
		top: spacing.unit,
		transitionDuration:".5s",
	},
	brandName:{
		marginLeft:spacing.unit*12
	},
	grow:{
		flexGrow:1
	},
	iconButtonImg:{
		maxWidth:spacing.unit*4
	},
	loadingBar:{
		background:red[600],
		height:spacing.unit,
		position:"fixed",
		zIndex:5000,
	},
	root:{
		zIndex:1500
	}
}))

interface IProps {
	classes:{
		brandName:string,
		avatar:string,
		iconButtonImg:string,
		root:string,
		grow:string,
		loadingBar:string
	}
};

class Header extends React.Component<IProps>{
	
	public render(){
		const {classes} = this.props;

		return(
			<div>
				<LoadingBar className={classes.loadingBar} />
				<AppBar className={classes.root} position="fixed" color="primary" >
					<Toolbar variant="dense">
						<Avatar className={classes.avatar} >
							<Link to="/">
								<img width="100%" src={logo} alt="WhizSid logo transparent cobra snake python kali linux s-letter WS"/>
							</Link>
						</Avatar>
						<Typography className={classes.brandName} variant="h5" align="center">WhizSid</Typography>
						<div className={classes.grow}/>
						<IconButton href="https://github.com/whizsid" >
							<img className={ classes.iconButtonImg}  width="100%" src={githubIcon} alt="Github icon transparent svg"/>
						</IconButton>
					</Toolbar>
				</AppBar>
			</div>
		);
	}

}

export default styles(Header);