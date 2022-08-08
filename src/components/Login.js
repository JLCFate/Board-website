import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";

export default function Login() {
	const { loginWithRedirect } = useAuth0();

	useEffect(() => {
		document.title = "JLC Gate";
	}, []);

	return (
		<Box
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<img src={require("../assets/logo.png")} style={{ height: "20vh", width: "20vh" }} alt={"JLC Logo"} />
			<Box
				sx={{
					cursor: "pointer",
					marginTop: "50px",
					color: "#f1f1f1",
					textShadow: "0 0 15px #000",
					fontWeight: "bold",
					fontSize: "1.25rem",
					textDecoration: "none",
					transition: "color 100ms ease-out",
					"&:hover": {
						color: "#fff",
					},
				}}
				onClick={() => loginWithRedirect()}
			>
				Kliknij tutaj, aby się zalogować
			</Box>
		</Box>
	);
}
