import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Tabell({rainData}) {
    
    return(
        <div className="Tabell">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dato</TableCell>
                        <TableCell align="right">Nedbør(<b>mm</b>)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rainData.toReversed().map((row) => (
                        <TableRow
                        key={row.key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.key}
                        </TableCell>
                        
                        <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}