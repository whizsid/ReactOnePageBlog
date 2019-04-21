import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as React from 'react';
import {Provider} from 'react-redux';
import store from 'src/store';
import theme from 'src/theme';
import Router from '../Router';
import './App.css';


class App extends React.Component {
	public render() {

		return (
			<div className="App">
				<Provider store={store}>
					<MuiThemeProvider theme={theme}>
						<Router />
					</MuiThemeProvider>
				</Provider>
			</div>
		);
	}
}

export default App;
