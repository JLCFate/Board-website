import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/Main-Page";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./components/Login";
import LogsPage from "./components/Logs-Page";

function App() {
	const { isAuthenticated, isLoading } = useAuth0();

	return (
		<Router>
			<Routes>
				{isAuthenticated && (
					<React.Fragment>
						<Route exact path="/" element={<MainPage />} />
						<Route exact path="/logs" element={<LogsPage />} />
					</React.Fragment>
				)}
				{!isAuthenticated && !isLoading && <Route path="/" element={<Login />} />}
			</Routes>
		</Router>
	);
}

export default App;
