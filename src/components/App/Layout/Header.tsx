import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import facebookIcon from "../../../resources/facebook.svg";
import githubIcon from "../../../resources/github.svg";
import logo from "../../../resources/logo.svg";
import twitterIcon from "../../../resources/twitter.svg";

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
	}
};

class Header extends React.Component<IProps>{
	
	public render(){
		const {classes} = this.props;

		return(
			<div>
				<AppBar className={classes.root} position="fixed" color="primary" >
					<Toolbar variant="dense">
						<Avatar className={classes.avatar} >
							<img width="100%" src={logo} alt="WhizSid logo transparent cobra snake python kali linux s-letter WS"/>
						</Avatar>
						<Typography className={classes.brandName} variant="h5" align="center">WhizSid</Typography>
						<div className={classes.grow}/>
						<IconButton href="https://facebook.com/Prince.Of.SL" >
							<img className={ classes.iconButtonImg}  width="100%" src={facebookIcon} alt="Facebook icon transparent svg"/>
						</IconButton>
						<IconButton href="https://twitter.com/@shirty_boy" >
							<img className={ classes.iconButtonImg}  width="100%" src={twitterIcon} alt="Twitter icon transparent svg"/>
						</IconButton>
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