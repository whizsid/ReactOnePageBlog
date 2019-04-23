import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Layout from '../App/Layout';


class HomePage extends React.Component {

	public render(){
		return (
			<Layout>
				<Grid container={true}>
					<Grid md={12} item={true}>
						<Typography variant="h3" align="center">සිංහල මෘදුකාංග ලියකියවිලි</Typography>
					</Grid>
				</Grid>
			</Layout>
		);
	}
}

export default HomePage;