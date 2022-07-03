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
import {Box, Divider, Stack, tableCellClasses, TextField} from "@mui/material";
import {groupsAPI} from "../../services/GroupService";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UserRow from "../../components/UI/UserRow/UserRow";

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

    const adduser = () => {
        console.log('click')
    }


    return (
        <div>
            <p className="title">Пользователи</p>
            <div
                style={{
                    backgroundColor: "rgb(250, 250, 252)",
                    float: "left",
                    width: "100%",
                    padding: "25px",
                    boxSizing: "border-box",
                    borderRadius: "10px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        padding: "25px",
                        boxSizing: "border-box"
                    }}
                >
                    <TextField
                        id="standard-search"
                        label="Найти по имени"
                        type="search"
                        variant="standard"
                        sx={{
                            width: "30%",
                        }}
                    />
                    <PersonAddAltIcon
                        sx={{
                            padding: "8px",
                            cursor: "pointer"
                        }}
                        onClick={() => adduser()}
                    />
                </div>
                <Stack
                    direction='column'
                    alignItems='stretch'
                    justifyContent='flex-start'
                    spacing={2}
                >
                    <UserRow id='141551871' name='Sergey Nyuskhaev' role='administrator' />
                    <UserRow id='141551871' name='Super_Long_Name 11111112312312' role='administrator' />
                    <UserRow id='141551871' name='Sergey Nyuskhaev' role='administrator' />
                    <UserRow id='141551871' name='Sergey Nyuskhaev' role='administrator' />
                </Stack>
            </div>
        </div>
    );
};

export default AdminPage;