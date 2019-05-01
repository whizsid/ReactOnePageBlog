
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

export default (props:any):React.ReactElement=>(
	<ListItem divider={true} dense={true} button={true} {...props} children={undefined}>
		<ListItemText primary={props.children}/>
	</ListItem>
);