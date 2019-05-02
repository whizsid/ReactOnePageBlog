import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Markdown from 'markdown-to-jsx';
import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { APP_URL } from 'src/config';
import { AppState } from 'src/rootReducer';
import { fetchPost } from 'src/store/Post/actions';
import { IPostStates } from 'src/store/Post/types';
import Layout from '../App/Layout';
import Link from './Link';
import overridesComponent from './overrides';

const mapStateToProps = (state: AppState) => ({
	...state.post
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onChangePost: (path: string) => dispatch(fetchPost(path))
})

const styles = withStyles(({palette,spacing }) => ({
	block: {
		background:palette.grey[700],
		border:"1px solid "+palette.grey[300],
		borderBottomRightRadius:spacing.unit,
		borderTopLeftRadius:spacing.unit,
		boxShadow:"2px 2px 4px #000",
		margin:spacing.unit*2,
		padding:spacing.unit*2,
		textAlign: "left",
	},
	marginBottom:{
		marginBottom:spacing.unit*2
	},
	secondaryTypo:{
		color:palette.grey[100],
		fontSize:'.65em',
		paddingBottom:spacing.unit
	}
}))

interface IProps extends IPostStates {
	classes: {
		block: string,
		marginBottom:string,
		secondaryTypo:string
	},
	match: {
		params: {
			0: string
		}
	},
	onChangePost: (path: string) => void
};

const ListItemLink = (link:string) => (props:ListItemProps):React.ReactElement=>(
	<Link {...props} href={link} children={props.children} />
)

class Post extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);

		props.onChangePost(props.match.params[0])
	}

	public render() {
		const { contents, classes } = this.props;

		return (
			<Layout>
				<Grid container={true}>
					<Grid item={true} xs={12} lg={9}  md={8}>
						<div className={classes.block}>
							<Markdown options={{
								overrides: overridesComponent
							}}>
								{contents}
							</Markdown>
						</div>
					</Grid>
					<Grid item={true} xs={12} lg={3} md={4}>
						<div className={classes.block}>
							<Typography variant="h6" align="center">විස්තර</Typography>
							<Divider className={classes.marginBottom}/>
							{this.renderMetaDetails()}
						</div>
						{this.renderOtherPages()}
					</Grid>
				</Grid>
			</Layout>
		)
	}

	public componentDidUpdate(prevProps: IProps) {
		if (prevProps.match.params[0] !== this.props.match.params[0]) {
			this.props.onChangePost(this.props.match.params[0]);
		}
	}

	protected renderMetaDetails(){
		const {meta,classes} = this.props;

		if(typeof meta==='undefined'){
			return (
				<Typography variant="body1" align="center">කතෲන් සම්බන්ධව කිසිදු සටහනක් තබා නොමැත.</Typography>
			)
		}
		else {
			return(
				<React.Fragment>
					<Typography variant="body1">අවසාන සංසකරණ වේලාව</Typography>
					<Typography >{meta.time}</Typography>
					<Divider className={classes.marginBottom}/>
					{this.renderWriters()}
				</React.Fragment>
			)
		}
	}

	protected renderWriters(){
		const {meta,classes} = this.props;

		if(typeof meta === 'undefined'||typeof meta.writers==='undefined'){
			return null;
		}


		return (
			<React.Fragment>
				<Typography variant="body1">රචකයන්</Typography>
				<List dense={true}>
				{meta.writers.map((writer,key)=>(
					<ListItem key={key} component={ListItemLink("https://github.com/"+writer.username)} dense={true} button={true} divider={true}>
						<ListItemAvatar>
							<Avatar>
								<img src={APP_URL+"data/resources/writerAvatars/"+writer.avatar}/>
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={writer.name}/>
					</ListItem>
				))}
				</List>
				<Divider className={classes.marginBottom}/>
			</React.Fragment>
		)
	}

	protected renderOtherPages(){
		const {meta,classes} = this.props;

		if(typeof meta==='undefined'){
			return null;
		}

		if(typeof meta.seeAlso ==='undefined' && typeof meta.next==='undefined'&& typeof meta.previous==='undefined'){
			return null;
		}

		return (
			<div className={classes.block}>
				<Typography variant="h6" align="center">සබැදි පිටු</Typography>
				<Divider className={classes.marginBottom}/>
				<List dense={true}>
				{this.renderNext()}
				{this.renderPrevious()}
				{this.renderAlsoLinks()}
				</List>
			</div>
		)
	}

	protected renderNext(){
		const {meta,classes} = this.props;

		if(typeof meta === 'undefined'||typeof meta.next==='undefined'){
			return null;
		}

		return (
			<ListItem dense={true} button={true} divider={true} component={ListItemLink(meta.next.link)} >
				<ListItemText primary={meta.next.title}  secondaryTypographyProps={{className:classes.secondaryTypo}} secondary="මීළග පිටුව" />
			</ListItem>
		)
	}

	protected renderPrevious(){
		const {meta,classes} = this.props;

		if(typeof meta === 'undefined'||typeof meta.previous==='undefined'){
			return null;
		}

		return (
			<ListItem dense={true} button={true} divider={true} component={ListItemLink(meta.previous.link)} >
				<ListItemText primary={meta.previous.title} secondaryTypographyProps={{className:classes.secondaryTypo}} secondary="කළින් පිටුව" />
			</ListItem>
		)
	}

	protected renderAlsoLinks(){
		const {meta} = this.props;

		if(typeof meta === 'undefined'||typeof meta.seeAlso==='undefined'){
			return null;
		}

		return meta.seeAlso.map((post,key)=>(
			<ListItem dense={true} button={true} divider={true} key={key} component={ListItemLink(post.link)} >
				<ListItemText primary={post.title} />
			</ListItem>
		));
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(styles(Post));
