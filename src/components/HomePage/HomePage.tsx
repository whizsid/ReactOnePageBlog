import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import wallpaperImage from '../../resources/home.png';
import Layout from '../App/Layout';

const styles = withStyles(({spacing,palette})=>({
	breadcrumb:{
		backgroundImage:'url('+wallpaperImage+')',
		backgroundPosition:'center',
		backgroundSize:'cover',
		height:'40vh',
		maxHeight:500,
		minHeight:300
	},
	breadcrumbButton:{
		fontSize:'1em',
		margin:spacing.unit*2,
		marginBottom:spacing.unit*10,
		marginTop:spacing.unit*10,
		padding:spacing.unit*5,
	},
	breadcrumbFooter:{
		paddingTop:spacing.unit*6
	},
	breadcrumbParagraph:{
		color:palette.text.secondary,
		fontSize:'.75em',
		marginTop:spacing.unit*6,
		paddingLeft:'50%',
		paddingRight:spacing.unit*4,
		textShadow:'1px 1px 2px #fff'
	},
	breadcrumbTitle:{
		marginTop:spacing.unit*16
	}
}));

interface IProp {
	classes:{
		breadcrumb:string,
		breadcrumbButton:string,
		breadcrumbFooter:string,
		breadcrumbParagraph:string,
		breadcrumbTitle:string,
	}
};

class HomePage extends React.Component<IProp> {

	public render(){
		const {classes} = this.props;

		return (
			<Layout>
				<Grid container={true}>
					<Grid className={classes.breadcrumb} md={12} item={true}>
						<Typography className={classes.breadcrumbTitle} variant="h3" align="center">සිංහල පරිගණක භාෂා ලියකියවිලි</Typography>
						<Divider/>
						<Typography className={classes.breadcrumbParagraph} align="right" variant="body2">ලංකාවේ සිසුන්ගේ පරිගණක සාක්ෂරතාව වර්ධනය කිරීමේ අරමුණින් මෙම විවෘත කේත ව්‍යාපෘතිය ආරම්භ කරන ලදී. මෙය වැඩිදියුණු කිරීමට හෝ නව ලිපි එකතු කිරීමට ඔබටද හැකියාව ඇත.</Typography>
					</Grid>
					<Grid md={12} item={true}>
						<Button href="https://github.com/whizsid/whizsid.github.io" variant="outlined" className={classes.breadcrumbButton}>මෙහි කේත</Button>
						<Button href="https://github.com/whizsid" variant="outlined" className={classes.breadcrumbButton} >වෙනත් ව්‍යාපෘති</Button>
						<Divider />
						<Typography className={classes.breadcrumbFooter} variant="body1" align="center">
							මෙහි ඇති සියලුම ලිපි හා කේත උපුටා ගැනීම හා වෙනත් තැන් වල පළ කිරීමේ අයිතිය ඔබ සතු වන අතර කරුණාකාර යුතුකමක් ලෙස හැකි සෑම විටම කතෘ අයිතිය සුරකින්න.
						</Typography>
						<Typography align="center" variant="body1">
							නවතම පිටපත  0.1v
						</Typography>
					</Grid>
				</Grid>
			</Layout>
		);
	}
}

export default styles (HomePage);