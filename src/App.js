import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfoPage from "./components/InfoPage";
import LogsPage from "./components/LogsPage";

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: 0,
					backgroundColor: "#36817F",
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<React.Fragment>
						<Route exact path="/" element={<InfoPage />} />
						<Route exact path="/logs" element={<LogsPage />} />
					</React.Fragment>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
