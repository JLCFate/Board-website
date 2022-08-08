import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import InfoPage from "./components/InfoPage";
import LogsPage from "./components/LogsPage";
import Login from "./components/Login";

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
	const { isAuthenticated, isLoading } = useAuth0();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			{isAuthenticated && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						opacity: 0.1,
					}}
				>
					<img
						src={require("./assets/logo.png")}
						style={{
							height: "20vh",
							width: "20vh",
						}}
						alt={"JLC Logo"}
					/>
				</div>
			)}
			<Router>
				<Routes>
					{process.env.REACT_APP_DEV_TOKEN ? (
						<React.Fragment>
							{isAuthenticated && (
								<React.Fragment>
									<Route exact path="/" element={<InfoPage />} />
									<Route exact path="/logs" element={<LogsPage />} />
								</React.Fragment>
							)}
							{!isAuthenticated && !isLoading && <Route path="/" element={<Login />} />}
						</React.Fragment>
					) : (
						<React.Fragment />
					)}
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
