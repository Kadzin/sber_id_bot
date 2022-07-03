import React, {useState} from 'react';
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
import AddUser from "../../components/UI/AddUser/AddUser";

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

    const rawServerData = [
        {
            id: '141551871',
            name: 'Sergey Nyuskhaev',
            role: 'administrator'
        },
        {
            id: '12345678',
            name: 'Test User 1',
            role: 'moderator'
        },
        {
            id: '87654321',
            name: 'Another User',
            role: 'user'
        },
    ]

    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);
    const handleOpenAddUserModal = () => {
        setOpenAddUserModal(true);
    };
    const handleCloseAddUserModal = () => {
        setOpenAddUserModal(false);
    };

    const [searchValue, setSearchValue] = useState('')

    return (
        <div>
            <p className="title">Пользователи</p>
            <div
                style={{
                    backgroundColor: "rgb(250, 250, 252)",
                    float: "left",
                    width: "100%",
                    padding: "0 25px 25px 25px",
                    boxSizing: "border-box",
                    borderRadius: "10px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
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
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <PersonAddAltIcon
                        sx={{
                            padding: "8px",
                            cursor: "pointer"
                        }}
                        onClick={handleOpenAddUserModal}
                    />
                </div>
                <Stack
                    direction='column'
                    alignItems='stretch'
                    justifyContent='flex-start'
                    spacing={2}
                >
                    {rawServerData && rawServerData.map((user) => {
                            if (user.name.toLowerCase().includes(searchValue.toLowerCase()) || searchValue == '') {
                                return <UserRow key={user.id} id={user.id} name={user.name} role={user.role}/>
                            }
                        }
                    )}
                </Stack>
            </div>
            <AddUser openModal={openAddUserModal} closeCallback={handleCloseAddUserModal} />
        </div>
    );
};

export default AdminPage;