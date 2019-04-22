import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src/rootReducer';
import { collapseMenu, expandMenu, fetchMenuItems } from 'src/store/Layout/actions';
import { IMainMenuItem } from 'src/store/Layout/types';

const mapStateToProps = (state: AppState) => ({
	...state.layout
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
	onCollapseMenu: (path: string) => dispatch(collapseMenu(path)),
	onExpandMenu: (path: string) => dispatch(expandMenu(path)),
	onLoadMenu: (path: string) => dispatch(fetchMenuItems(path))
});

interface IProp extends IMainMenuItem {
	classes: {
		icon: string
	},
	onExpandMenu?: (path: string) => void,
	onCollapseMenu?: (path: string) => void,
	onLoadMenu?: (path: string) => void
};

export class DrawerMenuItem extends React.Component<IProp> {
	public render() {
		const { title, link } = this.props;

		return (
			<React.Fragment>
				<ListItem divider={true} href={typeof link !== 'undefined' ? link : undefined} dense={true} >
					<ListItemText primary={title} />
					{this.renderExpandIcon()}
				</ListItem>
				{this.renderChildrens()}
			</React.Fragment>
		)
	}

	protected handleExpandMoreClick = (path: string, load = true) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();

		const { onExpandMenu, onLoadMenu } = this.props;

		if (typeof onExpandMenu !== 'undefined') {
			if (load) {
				if (typeof onLoadMenu !== 'undefined') {
					onLoadMenu(path);
				}
			} else {
				onExpandMenu(path);
			}
		}
	}

	protected handleExpandLessClick = (path: string) => (e: React.MouseEvent) => {
		e.preventDefault();

		const { onCollapseMenu } = this.props;

		if (typeof onCollapseMenu !== 'undefined') {
			onCollapseMenu(path);
		}
	}

	protected renderChildrens() {
		const { childrens, expanded, classes,onLoadMenu,onExpandMenu,onCollapseMenu } = this.props;

		if ( typeof childrens === 'undefined') {
			return null;
		} else {
			return (
				<Collapse in={expanded} timeout="auto" unmountOnExit={true}>
					<List>
						{Object.keys(childrens).map((key) => {
							const props = childrens[key];

							return (
								<DrawerMenuItem
									onCollapseMenu={onCollapseMenu}
									onExpandMenu={onExpandMenu}
									onLoadMenu={onLoadMenu}
									key={key}
									classes={classes}
									{...props}
								/>
							)

						})}
					</List>
				</Collapse>
			)
		}
	}

	protected renderExpandIcon() {
		const { expanded, childrens, path, loaded, link } = this.props;

		if (typeof childrens === 'undefined' || typeof link !== 'undefined') {
			return null;
		}

		if (expanded) {
			return (
				<ListItemSecondaryAction>
					<IconButton onClick={this.handleExpandLessClick(path)} >
						<ExpandLessIcon />
					</IconButton>
				</ListItemSecondaryAction>
			)
		}
		return (
			<ListItemSecondaryAction>
				<IconButton onClick={this.handleExpandMoreClick(path, !loaded)}>
					<ExpandMoreIcon />
				</IconButton>
			</ListItemSecondaryAction>
		);
	}


}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenuItem);