import {default as MuiLink, LinkProps} from '@material-ui/core/Link';
import * as React from 'react';
import {Link as ReactLink} from 'react-router-dom';

interface IProps {
	href:string,
	children:any
};

class Link extends React.Component<IProps> {
	public render(){
		const {href,children} = this.props;

		if(href.substr(0,1)==='h'){
			return (
				<MuiLink {...this.props} href={href}>
					{children}
				</MuiLink>
			)
		}else {

			const Compo = (linkProps:LinkProps)=>(<ReactLink {...linkProps} to={typeof linkProps.href==='undefined'?"":linkProps.href} >{linkProps.children}</ReactLink> );

			return (
				<MuiLink {...this.props} href={href} component={Compo} >
					{children}
				</MuiLink>
			)
		}
	}
}

export default Link;