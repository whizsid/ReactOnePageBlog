import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter ,Route} from 'react-router-dom';
// import PropTypes from "prop-types";
import HomePage from "./HomePage/HomePage";
// import { APP_DIRECTORY, APP_URL, ERROR_403_PAGE } from "../config";

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

class Router extends React.Component {

	public render() {
		return (
			<BrowserRouter >
				<div>
					<Route path="/" exact={true} component={HomePage} />
					{this.userMiddleware()}
					{this.guestMiddleware()}
				</div>
			</BrowserRouter>
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
