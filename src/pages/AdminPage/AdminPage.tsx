import React, {useEffect, useState} from 'react';
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
import UpdateUser from "../../components/UI/UpdateUser/UpdateUser";
import {IGroupsUpdateResponse} from "../../models/IGroupsUpdateReponse";
import {IUsers} from "../../models/IUsers";

const AdminPage = () => {

    const {data: users, isLoading, error} = groupsAPI.useFetchUsersQuery('');
    const {data: userData, isLoading: userDataIsLoading, error: userDataError} = groupsAPI.useGetUserQuery('')

    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);
    const handleOpenAddUserModal = () => {
        setOpenAddUserModal(true);
    };
    const handleCloseAddUserModal = () => {
        setOpenAddUserModal(false);
    };

    const [updateUserID, setUpdateUserID] = useState('')
    const [updateUserRole, setUpdateUserRole] = useState('')
    const [openUpdateUser, setOpenUpdateUser] = useState(false)
    const handleOpenUpdateUser = () => {
        setOpenUpdateUser(true)
    }
    const handleCloseUpdateUser = () => {
        setOpenUpdateUser(false)
    }

    const [searchValue, setSearchValue] = useState('')

    if(users && users[0].id != '00000000') {
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
                        {users && users.map((user) => {
                                if (user.name.toLowerCase().includes(searchValue.toLowerCase()) && userData) {
                                    return <UserRow
                                        key={user.id}
                                        id={user.id}
                                        name={user.name}
                                        role={user.role}
                                        setUpdateUserID={(value: string) => setUpdateUserID(value)}
                                        setUpdateUserRole={(value: string) => setUpdateUserRole(value)}
                                        showEditModal={handleOpenUpdateUser}
                                        userRole={userData.role}
                                    />
                                }
                            }
                        )}
                    </Stack>
                </div>
                <AddUser openModal={openAddUserModal} closeCallback={handleCloseAddUserModal} />
                <UpdateUser
                    id={updateUserID}
                    openModal={openUpdateUser}
                    closeCallback={handleCloseUpdateUser}
                    userRole={updateUserRole}
                />
            </div>
        );
    } else {
        return (
            <div>
                <p className="title">Пользователи</p>
                <p className="subtitle">У вас недостаточно прав для просмотра данного раздела</p>
            </div>
        )
    }
};

export default AdminPage;