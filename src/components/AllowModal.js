import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, DialogContentText } from "@mui/material";

export default function AllowModal(props) {
	const { address, onClose } = props;

	const handleClose = (result) => {
		let data = {
			authorized: result,
			awaiting: false,
		};
		fetch(`${process.env.REACT_APP_REST_URL}/users/authenticate/${address}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json", "X-Address": process.env.REACT_APP_DEV_TOKEN },
		})
			.then((res) => res.json())
			.then((data) => onClose(data));
	};

	return (
		<Dialog sx={{ borderRadius: "15px" }} open={true} onClose={onClose}>
			<DialogTitle sx={{ fontWeight: "bold", color: "#fff", backgroundColor: "#36817F", padding: "10px 20px" }}>Decyzja</DialogTitle>
			<DialogContent sx={{ backgroundColor: "#122B2A" }}>
				<DialogContentText sx={{ paddingTop: "25px", color: "#fff" }}>Wybierz opcje zatwierdzenia lub odrzucenia dostępu</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ padding: "10px 25px", backgroundColor: "#122B2A" }}>
				<Button sx={{ color: "#fff" }} onClick={() => handleClose(false)}>
					Odrzuć
				</Button>
				<Button variant="contained" sx={{ backgroundColor: "#255957" }} onClick={() => handleClose(true)}>
					Zatwierdź
				</Button>
			</DialogActions>
		</Dialog>
	);
}
