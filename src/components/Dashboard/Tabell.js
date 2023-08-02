import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Tabell.css';
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../actions/Site";
import MyDrawer from "./MyDrawer";

export default function Tabell({rainData}) {

    const drawer = useSelector(state => state.rootReducer.site.drawerOpen)
    const drawerDate = useSelector(state => state.rootReducer.site.drawerDate)
    const drawerDateIndex = useSelector(state => state.rootReducer.site.drawerDateIndex)
    const dispatch = useDispatch()

    function openDrawer(date, index) {
        dispatch(toggleDrawer({open: true, date: date, dateIndex: index}))
    }
    
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
                    {
                        rainData.map((row, index) => (
                            <TableRow
                            key={row.key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => openDrawer(row.key, index)}
                            >
                            <TableCell component="th" scope="row">
                                {row.key}
                            </TableCell>
                            
                            <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            {drawer ? <MyDrawer date={drawerDate} drawerDateIndex={drawerDateIndex} /> : ''}
        </div>
    )
}