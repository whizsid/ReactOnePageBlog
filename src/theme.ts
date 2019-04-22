import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
	palette: {
		primary: {
			dark: "#332448",
			light: "#936ace",
			main: "#542f88"
		},
		text: {
			primary: "#f0f0f0",
			secondary: "#f9f9f9"
		}
	},
	typography: {
		useNextVariants: true,
	},
});

export default theme;