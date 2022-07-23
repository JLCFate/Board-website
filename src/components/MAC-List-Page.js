import React from 'react';
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
    return (<StyledTableRow key={props.key}>
        <StyledTableCell component="th" scope="row">
            {props.name}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
            {props.mac}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
            <IconButton size="small">
                <FontAwesomeIcon size="sm" icon={faEdit} onClick={() => {alert("edit")}} />
            </IconButton>
            <IconButton size="small">
                <FontAwesomeIcon size="sm"  icon={faTrash} onClick={() => {alert("Trash")}} />
            </IconButton>
        </StyledTableCell>
    </StyledTableRow>
    )
}

function MacListPage(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                    <Row key="test" name="JA" mac="TEST" />
                    <Row key="test1" name="JA" mac="TEST" />
                    <Row key="test2" name="JA" mac="TEST" />
                    <Row key="test3" name="JA" mac="TEST" />
                    <Row key="test4" name="JA" mac="TEST" />
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
                    <TextField label="Nazwa użytkownika" color="secondary" focused />
                    <TextField sx={{marginLeft: "25px"}} label="MAC-Adres" color="secondary" focused />
                    <br></br>
                    <Button sx={{margin: "15px", float: "right"}} onClick={handleClose} variant="contained">Dodaj</Button>
                </Box>
            </Modal>
    </React.Fragment>
    );
}

export default MacListPage;