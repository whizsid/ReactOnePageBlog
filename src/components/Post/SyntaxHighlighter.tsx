import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import ReactDOMServer from 'react-dom-server';

interface IProps {
 children:React.ReactElement,
 code:string,
 [x:string]:any
}

class MySyntaxHighlighter extends React.Component<IProps>{
	public render(){
		const {children,code} = this.props;

		let text = this.strip(ReactDOM.renderToString(children));
		
		if(text.trim()===""){
			text=code;
		}

		return(
			<SyntaxHighlighter {...this.props} code={undefined} children={this.replaceAll(text,"&gt;",">")}/>
		);
	}

	protected replaceAll(str:string, find:string, replace:string) {
		return str.replace(new RegExp(find, 'g'), replace);
	}

	protected strip(html:string):string
	{
	   const tmp = document.createElement("DIV");
	   tmp.innerHTML = html;
	   return tmp.textContent || tmp.innerText || "";
	}
}

export default MySyntaxHighlighter;