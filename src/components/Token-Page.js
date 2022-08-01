import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, Modal, TableFooter, TablePagination, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";

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
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "auto",
	bgcolor: "background.paper",
	border: "2px solid #000",
	display: "inline-block",
	boxShadow: 24,
	p: 4,
};

function Row(props) {
	return (
		<StyledTableRow key={props.id}>
			<StyledTableCell component="th" scope="row">
				{props.name}
			</StyledTableCell>
			<StyledTableCell component="th" scope="row">
				{props.mac}
			</StyledTableCell>
			<StyledTableCell component="th" scope="row">
				{props.status.awaiting ? "Oczekujący" : props.status.authorized ? "Zatwierdzony" : "Odrzucony"}
			</StyledTableCell>
			<StyledTableCell component="th" scope="row">
				{props.status.awaiting && (
					<IconButton size="small" onClick={props.handleAllow}>
						<FontAwesomeIcon size="sm" icon={faUnlock} />
					</IconButton>
				)}

				<IconButton size="small" onClick={props.handleEdit}>
					<FontAwesomeIcon size="sm" icon={faEdit} />
				</IconButton>
				<IconButton size="small" onClick={props.handleDelete}>
					<FontAwesomeIcon size="sm" icon={faTrash} />
				</IconButton>
			</StyledTableCell>
		</StyledTableRow>
	);
}

function TokenPage(props) {
	const [open, setOpen] = React.useState(false);
	const [allowOpen, setAllowOpen] = React.useState(false);
	const [nameValue, setNameValue] = React.useState("");
	const [macValue, setMacValue] = React.useState("");
	const { tokenList, setTokenList, type } = props;

	console.log(tokenList);

	const handleClose = () => {
		setOpen(false);
		setNameValue("");
		setMacValue("");
	};

	const handleAllowClose = () => {
		setAllowOpen(false);
		setMacValue("");
	};

	const handleDelete = (mac) => {
		fetch(`${process.env.REACT_APP_REST_URL}/users/${mac}`, {
			method: "DELETE",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => setTokenList(data));
	};

	const handleAllowOpen = (address) => {
		setMacValue(address);
		setAllowOpen(true);
	};

	const handleEdit = (name, address) => {
		setNameValue(name);
		setMacValue(address);
		setOpen(true);
	};

	const handleSubmit = () => {
		if (nameValue !== "" && macValue !== "") {
			const data = {
				name: nameValue,
				address: macValue,
			};
			fetch(`${process.env.REACT_APP_REST_URL}/users/${macValue}`, {
				method: "PUT",
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => res.json())
				.then((data) => setTokenList(data));
			handleClose();
		}
	};

	const handleDecision = (result) => {
		let data = {
			authorized: result,
			awaiting: false,
		};
		fetch(`${process.env.REACT_APP_REST_URL}/users/authenticate/${macValue}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => setTokenList(data));
		handleAllowClose();
	};

	const handleChange = (event, setter) => {
		setter(event.target.value);
	};

	return (
		<React.Fragment>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell sx={{ width: "45%" }}>Użytkownik</StyledTableCell>
							<StyledTableCell sx={{ width: "30%" }}>MAC Adres</StyledTableCell>
							<StyledTableCell sx={{ width: "15%" }}>Status zatwierdzenia</StyledTableCell>
							<StyledTableCell sx={{ width: "10%" }}></StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tokenList
							?.filter((e) => (type === "allowed" ? e.authorized || e.awaiting : !e.authorized))
							.map((row, index) => {
								return (
									<Row
										key={`addres-row-${index}`}
										id={`addres-${index}`}
										name={row.name}
										mac={row.address}
										status={{ authorized: row.authorized, awaiting: row.awaiting }}
										handleAllow={() => handleAllowOpen(row.address)}
										handleEdit={() => handleEdit(row.name, row.address)}
										handleDelete={() => handleDelete(row.address)}
									/>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Podaj wymagane dane
					</Typography>
					<br></br>
					<TextField label="Nazwa użytkownika" value={nameValue} color="secondary" focused onChange={(event) => handleChange(event, setNameValue)} />
					<TextField
						sx={{ marginLeft: "25px" }}
						label="Token"
						value={macValue}
						color="secondary"
						onChange={(event) => handleChange(event, setMacValue)}
					/>
					<br></br>
					<Button sx={{ margin: "15px", float: "right" }} onClick={handleSubmit} variant="contained">
						Aktualizuj
					</Button>
				</Box>
			</Modal>
			<Modal open={allowOpen} onClose={handleAllowClose}>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
						Dostęp do systemu
					</Typography>
					<br></br>
					<Button onClick={() => handleDecision(true)} variant="contained">
						Zatwierdź
					</Button>
					<Button sx={{ ml: 3 }} onClick={() => handleDecision(false)} variant="contained">
						Odrzuć
					</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default TokenPage;
