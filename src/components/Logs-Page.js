import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TableFooter, TablePagination} from "@mui/material";


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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function LogsPage(props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Wydający polecenie</StyledTableCell>
                        <StyledTableCell>MAC Adres</StyledTableCell>
                        <StyledTableCell>Godzina</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow key="test">
                        <StyledTableCell component="th" scope="row">
                            JA
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            TEST
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            Teraz
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key="test1">
                        <StyledTableCell component="th" scope="row">
                            JA
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            TEST
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            Teraz
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key="test2">
                        <StyledTableCell component="th" scope="row">
                            JA
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            TEST
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            Teraz
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key="test3">
                        <StyledTableCell component="th" scope="row">
                            JA
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            TEST
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            Teraz
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key="test4">
                        <StyledTableCell component="th" scope="row">
                            JA
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            TEST
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            Teraz
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LogsPage;