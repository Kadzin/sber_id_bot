import React from 'react';
import '../pages.css'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import {tableCellClasses} from "@mui/material";
import {groupsAPI} from "../../services/GroupService";

const AdminPage = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#21a038",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center"
        },
        [`&.${tableCellClasses.body}`]: {
            paddingRight: "50px",
            paddingLeft: "50px",
            textAlign: "center"
        }
    }));

    const StyledTableCellLeft = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            paddingRight: "50px",
            paddingLeft: "50px",
            borderRight: "1px solid #cecece",
            textAlign: "center"
        }
    }));
    const StyledTableCellCenter = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            paddingRight: "50px",
            paddingLeft: "50px",
            borderRight: "1px solid #cecece",
            textAlign: "center"
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child th': {
            border: 0,
        },
    }));

    const {data: users, isLoading, error} = groupsAPI.useFetchUsersQuery('');


    return (
        <div>
            <p className="title">Пользователи</p>
            <div className="box">
                <TableContainer component={Paper} sx={{ maxWidth: 800, width: "auto" }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Имя пользователя</StyledTableCell>
                                <StyledTableCell>Teleram ID</StyledTableCell>
                                <StyledTableCell>Тип доступа</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users &&  users.map((user) => (
                                <StyledTableRow
                                    key={user.id}
                                    sx={{ '&:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCellLeft>{user.name}</StyledTableCellLeft>
                                    <StyledTableCellCenter>{user.id}</StyledTableCellCenter>
                                    <StyledTableCell>{user.role}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdminPage;