import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import ReactDOMServer from 'react-dom-server';

interface IProps {
 children:React.ReactElement,
 [x:string]:any
}

class MySyntaxHighlighter extends React.Component<IProps>{
	public render(){
		const {children} = this.props;
		
		return(
			<SyntaxHighlighter {...this.props} children={this.strip(ReactDOM.renderToString(children))}/>
		);
	}

	protected strip(html:string):string
	{
	   const tmp = document.createElement("DIV");
	   tmp.innerHTML = html;
	   return tmp.textContent || tmp.innerText || "";
	}
}

export default MySyntaxHighlighter;