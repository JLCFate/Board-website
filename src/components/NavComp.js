import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Box, Grid } from "@mui/material";
import { faList, faMobileScreenButton, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function NavComp(props) {
	const navigate = useNavigate();

	const OptionButton = (props) => {
		const handle = props.onClick ?? (() => navigate(props.target));
		return (
			<Tooltip arrow placement="right" title={props.title ?? "Not set"}>
				<Grid
					item
					xs={11}
					onClick={handle}
					sx={{
						height: "55px",
						margin: "12px",
						marginTop: "15px",
						backgroundColor: "#255957",
						marginBottom: 0,
						borderRadius: "10px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
						transition: "background-color 100ms ease-out",
						"&:hover": {
							backgroundColor: "#2c6a68",
						},
					}}
				>
					<FontAwesomeIcon style={{ fontSize: "1.25rem", color: "#fff" }} icon={props.icon} />
				</Grid>
			</Tooltip>
		);
	};
	return (
		<Grid container>
			<Grid
				item
				xs={0.5}
				sx={{
					width: "80px",
					minWidth: "80px",
					height: "100vh",
					backgroundColor: "#122B2A",
					display: "flex",
					justifyContent: "center",
					boxShadow: "5px 0px 10px 0px rgba(66, 68, 90, 1)",
					flexWrap: "wrap",
				}}
			>
				<Box>
					<Grid container>
						<OptionButton title={"Lista zapisanych tokenów"} icon={faMobileScreenButton} target={"/"} disabled={"t"} />
						<OptionButton title={"Dziennik zdarzeń"} icon={faList} target={"/logs"} disabled={"b"} />
					</Grid>
				</Box>
				<Box sx={{ width: "100%", marginTop: "auto", marginBottom: "15px" }}>
					<OptionButton title={"Wyloguj"} icon={faArrowRightFromBracket} onClick={() => alert("Logout")} />
				</Box>
			</Grid>
			<Grid item xs={11} style={{ margin: "15px", marginLeft: "auto", marginRight: "auto", minWidth: "1060px" }}>
				{props.children}
			</Grid>
		</Grid>
	);
}
