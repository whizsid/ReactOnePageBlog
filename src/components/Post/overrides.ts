import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import Link from './Link';
import ListItemWithTypography from './ListItemWithTypography';
import MySyntaxHighlighter from './SyntaxHighlighter';

export default {
	WSCode:{
		component:MySyntaxHighlighter
	},
	a:{
		component:Link
	},
	h1:{
		component: Typography,
		props:{
			align:"center",
			className:"title",
			variant:"h4",
		}
	},
	h2:{
		component: Typography,
		props:{
			align:"left",
			className:"title",
			variant:"h5",
		}
	},
	h3:{
		component: Typography,
		props:{
			align:"left",
			className:"title",
			variant:"h6",
		}
	},
	hr:{
		component: Divider
	},
	li:{
		component: ListItemWithTypography
	},
	p:{
		component:Typography,
		props:{
			align:"left",
			variant:"body1"
		}
	},
	ul:{
		component: List,
		props:{
			dense:true
		}
	},
};