import React, { useEffect } from "react";
import NavComp from "./NavComp";
import { UserRow as Row } from "./UserRow";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AllowModal from "./AllowModal";
import EditModal from "./EditModal";

export default function InfoPage() {
	const [rows, setRows] = React.useState(null);
	const [showDenied, setShowDenied] = React.useState(false);
	const [modalType, setModalType] = React.useState(null);
	const [nameValue, setNameValue] = React.useState("");
	const [shownRows, setShowRows] = React.useState([]);
	const [macValue, setMacValue] = React.useState("");

	const changeVisiblity = () => {
		setShowDenied(!showDenied);
		setShowRows(!showDenied ? rows : rows.filter((e) => e.authorized || e.awaiting));
	};

	const handleAllowOpen = (address) => {
		setMacValue(address);
		setModalType("allow");
	};

	const handleEdit = (name, address) => {
		setNameValue(name);
		setMacValue(address);
		setModalType("edit");
	};

	const handleDelete = (mac) => {
		fetch(`${process.env.REACT_APP_REST_URL}/users/${mac}`, {
			method: "DELETE",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setRows(data);
				setShowRows(data.filter((e) => e.authorized || e.awaiting));
			});
	};

	const handleClose = (data) => {
		setNameValue("");
		setMacValue("");
		setModalType(null);
		setRows(data);
		setShowRows(showDenied ? data : data.filter((e) => e.authorized || e.awaiting));
	};

	useEffect(() => {
		document.title = "Zapamiętane Tokeny | JLC Gate";
		if (rows === null) {
			fetch(`${process.env.REACT_APP_REST_URL}/users`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setRows(data);
					setShowRows(data.filter((e) => e.authorized || e.awaiting));
				});
		}
	}, [rows]);

	return (
		<NavComp>
			<TableContainer component={Paper} sx={{ width: "100%", maxHeight: "calc(100vh - 50px)", boxShadow: "0px 5px 10px 0px rgba(66, 68, 90, 1)" }}>
				<Table stickyHeader aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ backgroundColor: "#122B2A", width: "25%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
								Nazwa użytkownika
							</TableCell>
							<TableCell sx={{ backgroundColor: "#122B2A", width: "30%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
								Token
							</TableCell>
							<TableCell sx={{ backgroundColor: "#122B2A", width: "10%", color: "#fff", borderBottom: "none", fontWeight: "bold" }}>
								Status zatwierdzenia
							</TableCell>
							<TableCell sx={{ backgroundColor: "#122B2A", width: "25%", color: "#fff", borderBottom: "none", fontWeight: "bold" }} />
							<TableCell
								sx={{ backgroundColor: "#122B2A", width: "10%", color: "#fff", fontWeight: "bold", textAlign: "right", borderBottom: "none" }}
							>
								<Tooltip arrow title={showDenied ? "Ukryj odrzucone" : "Pokaż odrzucone"} placement="left">
									<IconButton size="small" onClick={changeVisiblity}>
										<FontAwesomeIcon size="sm" icon={showDenied ? faEye : faEyeSlash} style={{ color: "#fff" }} />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ backgroundColor: "#255957" }}>
						{shownRows?.map((el) => (
							<Row
								key={`user-${shownRows.indexOf(el)}`}
								row={el}
								handleAllow={() => handleAllowOpen(el.address)}
								handleEdit={() => handleEdit(el.name, el.address)}
								handleDelete={() => handleDelete(el.address)}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{modalType && modalType === "allow" ? (
				<AllowModal address={macValue} onClose={handleClose} />
			) : modalType === "edit" ? (
				<EditModal address={macValue} name={nameValue} onClose={handleClose} />
			) : null}
		</NavComp>
	);
}
