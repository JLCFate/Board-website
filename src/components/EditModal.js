import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Box } from "@mui/material";

export default function EditModal(props) {
	const [nameValue, setNameValue] = React.useState("");
	const [tokenValue, setTokenValue] = React.useState("");
	const { address, name, onClose } = props;

	const handleClose = () => {
		if (nameValue === name && tokenValue === address) onClose();
	};

	const handleChange = (event, setter) => setter(event.target.value);

	const handleSubmit = () => {
		if (nameValue !== "" && tokenValue !== "") {
			const data = { name: nameValue, address: tokenValue };
			fetch(`${process.env.REACT_APP_REST_URL}/users/${address}`, {
				method: "PUT",
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => res.json())
				.then((data) => onClose(data));
		}
	};

	useEffect(() => {
		setNameValue(name);
		setTokenValue(address);
	}, []); // eslint-disable-line

	return (
		<Dialog fullWidth maxWidth="sm" sx={{ borderRadius: "15px" }} open={true} onClose={handleClose}>
			<DialogTitle sx={{ fontWeight: "bold", color: "#fff", backgroundColor: "#36817F", padding: "10px 20px" }}>Edytor</DialogTitle>
			<DialogContent sx={{ backgroundColor: "#122B2A" }}>
				<Box sx={{ marginTop: "25px" }}>
					<TextField
						required
						autoFocus
						margin="dense"
						id="name"
						label="Nazwa użytkownika"
						value={nameValue}
						onChange={(event) => handleChange(event, setNameValue)}
						type="text"
						variant="standard"
						sx={{
							width: "200px",
							color: "#ffffff",
						}}
						inputProps={{ style: { color: "#ffffff" } }}
						InputLabelProps={{ style: { color: "#e1e1e1" } }}
					/>
					<TextField
						required
						margin="dense"
						id="address"
						label="Token"
						value={tokenValue}
						onChange={(event) => handleChange(event, setTokenValue)}
						type="text"
						variant="standard"
						sx={{
							marginLeft: "25px",
							width: "300px",
							color: "#ffffff",
						}}
						inputProps={{ style: { color: "#ffffff" } }}
						InputLabelProps={{ style: { color: "#e1e1e1" } }}
					/>
				</Box>
			</DialogContent>
			<DialogActions sx={{ padding: "10px 25px", backgroundColor: "#122B2A" }}>
				<Button variant="contained" sx={{ backgroundColor: "#255957", "&:hover": { backgroundColor: "#2c6a68" } }} onClick={handleSubmit}>
					Aktualizuj
				</Button>
			</DialogActions>
		</Dialog>
	);
}
