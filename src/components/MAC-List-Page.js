import React, {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, IconButton, Modal, TableFooter, TablePagination, TextField, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";


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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    display: "inline-block",
    boxShadow: 24,
    p: 4,
    pb: 0,
};

function Row(props){
    return (<StyledTableRow key={props.id}>
            <StyledTableCell component="th" scope="row">
                {props.name}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                {props.mac}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                <IconButton size="small" onClick={props.handleEdit}>
                    <FontAwesomeIcon size="sm" icon={faEdit} />
                </IconButton>
                <IconButton size="small" onClick={props.handleDelete}>
                    <FontAwesomeIcon size="sm"  icon={faTrash} />
                </IconButton>
            </StyledTableCell>
        </StyledTableRow>
    )
}

function MacListPage(props) {
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [allowedMacs, setAllowedMacs] = React.useState([]);
    const [nameValue, setNameValue] = React.useState("");
    const [macValue, setMacValue] = React.useState("");
    const [nameCheck, setNameCheck] = React.useState(false);
    const [macCheck, setMacCheck] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditing(false)
        setNameValue("");
        setMacValue("");
    }

    const handleDelete = (mac) => {
        fetch(`${process.env.REACT_APP_REST_URL}/users/${mac}`, {
            method: 'DELETE',
        }).then(res => {
            return res.json()
        }).then(data=>setAllowedMacs(data))
    }

    const handleEdit = (name, address) => {
        setNameValue(name);
        setMacValue(address);
        setOpen(true);
        setEditing(address);
    }

    const handleRegex = (event, reverse) => {
        const checkRegex = new RegExp("([\\w|\\d]{2}:){5}([\\w|\\d]{2})", "g");
        const value = event.target.value;
        if(reverse){
            setNameCheck(!checkRegex.test(value))
        }else{
            setMacCheck(checkRegex.test(value))
        }
    }

    const handleChange = (event, setter) => {
        setter(event.target.value)
    }

    const handleSubmit = () => {
        if(nameCheck && macCheck){
            const checkIfIn = allowedMacs.filter((el) => el.address === macValue)
            if(checkIfIn.length === 0){
                const data = {
                    name: nameValue,
                    address: macValue
                }
                fetch(`${process.env.REACT_APP_REST_URL}/users/${editing ? `/${editing}`:''}`, {
                    method: editing ? 'PUT' : 'POST',
                    body: JSON.stringify(data),
                    headers: {"Content-Type": "application/json"},
                }).then(res => res.json()).then(data=>setAllowedMacs(data))
                handleClose()
            }else{
                alert(`Adres MAC istnieje już w bazie`)
            }
        }else{
            alert(`Zjebałeś: ${nameCheck} | ${macCheck}` )
        }
    }

    useEffect(() =>{
        if(allowedMacs.length === 0){
            fetch(`${process.env.REACT_APP_REST_URL}/users`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            }).then(res => {
                return res.json()
            })
                .then(data=>setAllowedMacs(data))
        }
    }, [allowedMacs])

    return (<React.Fragment><TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{width: "55%"}}>Użytkownik</StyledTableCell>
                        <StyledTableCell sx={{width: "35%"}}>MAC Adres</StyledTableCell>
                        <StyledTableCell sx={{width: "10%"}}></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allowedMacs?.map((row, index) => {
                        return (<Row key={`addres-row-${index}`} id={`addres-${index}`} name={row.name} mac={row.address} handleEdit={() => handleEdit(row.name, row.address)} handleDelete={() => handleDelete(row.address)}/>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
            <Box sx={{
                display:"flex",
                justifyContent:"flex-end",
                alignItems:"flex-end"}}>
                <Button sx={{margin: "15px"}} onClick={handleOpen} variant="contained">Dodaj nowego użytkownika</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Podaj wymagane dane
                    </Typography>
                    <br></br>
                    <TextField label="Nazwa użytkownika" value={nameValue} color="secondary" focused onBlur={(event) => handleRegex(event, true)} onChange={(event) => handleChange(event, setNameValue)} />
                    <TextField sx={{marginLeft: "25px"}} label="MAC-Adres" value={macValue} color="secondary" onBlur={handleRegex} onChange={(event) => handleChange(event, setMacValue)} />
                    <br></br>
                    <Button sx={{margin: "15px", float: "right"}} onClick={handleSubmit} variant="contained">Dodaj</Button>
                </Box>
            </Modal>
    </React.Fragment>
    );
}

export default MacListPage;