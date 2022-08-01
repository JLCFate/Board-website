import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TokenPage from "./Token-Page";

function TabPane(props) {
	const { object, value, index } = props;
	return <div hidden={value !== index}>{value === index && object}</div>;
}

function MacListPage(props) {
	const [tokenList, setTokenList] = React.useState(null);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (tokenList === null) {
			fetch(`${process.env.REACT_APP_REST_URL}/users`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => setTokenList(data));
		}
	}, [tokenList]);

	return (
		<React.Fragment>
			<Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Zatwierdzone/Oczekujące połączenia" />
					<Tab label="Odrzucone połączenia" />
				</Tabs>
			</Box>
			<TabPane value={value} index={0} object={<TokenPage tokenList={tokenList} setTokenList={setTokenList} type={"allowed"} />} />
			<TabPane value={value} index={1} object={<TokenPage tokenList={tokenList} setTokenList={setTokenList} />} />
		</React.Fragment>
	);
}

export default MacListPage;
