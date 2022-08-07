import React from "react";
import { TableRow, TableCell } from "@mui/material";

export function LogRow(props) {
	const row = props.row;

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset", color: "#fff" }, borderBottom: "1px solid #122B2A" }}>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				{row.name}
			</TableCell>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				Użytkownik otworzył {row.type === "front" ? "przednią" : "tylną"} brame
			</TableCell>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				{row.address}
			</TableCell>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				{row.date}
			</TableCell>
		</TableRow>
	);
}
