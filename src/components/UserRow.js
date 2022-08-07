import React from "react";
import { IconButton, TableRow, TableCell } from "@mui/material";
import { faUnlock, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function UserRow(props) {
	const row = props.row;

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset", color: "#fff" }, borderBottom: "1px solid #122B2A" }}>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				{row.name}
			</TableCell>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				{row.address}
			</TableCell>
			<TableCell component="th" scope="row" sx={{ color: "#fff", borderBottom: "none" }}>
				{row.awaiting ? "Oczekujący" : row.authorized ? "Zatwierdzony" : "Odrzucony"}
			</TableCell>
			<TableCell sx={{ borderBottom: "none" }} />
			<TableCell sx={{ borderBottom: "none" }}>
				{row.awaiting && (
					<IconButton size="small" onClick={props.handleAllow}>
						<FontAwesomeIcon size="sm" icon={faUnlock} style={{ color: "#fff" }} />
					</IconButton>
				)}
				<IconButton size="small" onClick={props.handleEdit}>
					<FontAwesomeIcon size="sm" icon={faEdit} style={{ color: "#fff" }} />
				</IconButton>
				<IconButton size="small" onClick={props.handleDelete}>
					<FontAwesomeIcon size="sm" icon={faTrash} style={{ color: "#fff" }} />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
