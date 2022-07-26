import React, { useEffect } from "react";
import NavComp from "./NavComp";
import { LogRow as Row } from "./LogRow";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Skeleton } from "@mui/material";

export default function LogsPage() {
	const [rows, setRows] = React.useState(null);

	useEffect(() => {
		document.title = "Dziennik zdarzeń | JLC Gate";
		if (rows === null) {
			fetch(`${process.env.REACT_APP_REST_URL}/logs`, {
				method: "GET",
				headers: { "Content-Type": "application/json", "X-Address": process.env.REACT_APP_DEV_TOKEN },
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => setRows(data));
		}
	}, [rows]);
	return (
		<NavComp>
			{rows ? (
				<TableContainer component={Paper} sx={{ width: "100%", maxHeight: "calc(100vh - 50px)", boxShadow: "0px 5px 10px 0px rgba(66, 68, 90, 1)" }}>
					<Table stickyHeader aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ backgroundColor: "#122B2A", width: "20%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
									Wydający polecenie
								</TableCell>
								<TableCell sx={{ backgroundColor: "#122B2A", width: "30%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
									Opis
								</TableCell>
								<TableCell sx={{ backgroundColor: "#122B2A", width: "30%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
									Token
								</TableCell>
								<TableCell sx={{ backgroundColor: "#122B2A", width: "20%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
									Znacznik Czasu
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{ backgroundColor: "#255957" }}>
							{rows
								?.sort((a, b) => new Date(b.date) - new Date(a.date))
								.map((el) => (
									<Row key={`user-${rows.indexOf(el)}`} row={el} />
								))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Skeleton variant="rectangular" sx={{ width: "100%", height: "45vh" }} />
			)}
		</NavComp>
	);
}
