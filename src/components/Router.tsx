import * as React from "react";
import { connect } from "react-redux";
import { HashRouter ,Route} from 'react-router-dom';
// import PropTypes from "prop-types";
import HomePage from "./HomePage/HomePage";
import Post from './Post/Post';
// import { APP_DIRECTORY, APP_URL, ERROR_403_PAGE } from "../config";

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

class Router extends React.Component {

	public render() {
		return (
			<HashRouter basename="/" >
				<div>
					<Route path="/" exact={true} component={HomePage} />
					<Route path="/post/*" exact={true} component={Post}/>
					{this.userMiddleware()}
					{this.guestMiddleware()}
				</div>
			</HashRouter>
		);
	}

	protected userMiddleware() {
		return null;
	}

	protected guestMiddleware() {
		return null;
	}

}

// Router.propTypes = {
// };

export default connect(mapStateToProps, mapDispatchToProps)(Router);
