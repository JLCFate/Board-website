import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Tab, Tabs } from "@mui/material";
import LogsPage from "./Logs-Page";
import MacListPage from "./MAC-List-Page";

function TabPane(props) {
	const { object, value, index } = props;
	return <div hidden={value !== index}>{value === index && object}</div>;
}

function MainPage(props) {
	const { logout } = useAuth0();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: value === 1 ? "26px" : 0 }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Zapisane adresy MAC" />
					<Tab label="Logi" />
				</Tabs>
			</Box>
			<TabPane value={value} index={0} object={<MacListPage />} />
			<TabPane value={value} index={1} object={<LogsPage />} />
		</React.Fragment>
	);
}

export default MainPage;
