import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, TablePagination } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function LogsPage(props) {
	const [logsArray, setLogsArray] = React.useState([]);

	useEffect(() => {
		if (logsArray.length === 0) {
			fetch(`${process.env.REACT_APP_REST_URL}/logs`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => setLogsArray(data));
		}
	}, [logsArray]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Wydający polecenie</StyledTableCell>
						<StyledTableCell>Opis</StyledTableCell>
						<StyledTableCell>MAC Adres</StyledTableCell>
						<StyledTableCell>Godzina</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{logsArray?.map((row, index) => {
						return (
							<StyledTableRow key={`log-row-${index}`}>
								<StyledTableCell component="th" scope="row">
									{row.name}
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									Użytkownik otworzył {row.type === "front" ? "przednią" : "tylną"} brame
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{row.address}
								</StyledTableCell>
								<StyledTableCell component="th" scope="row">
									{row.date}
								</StyledTableCell>
							</StyledTableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default LogsPage;
