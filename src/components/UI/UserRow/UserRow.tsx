import React, {FC, useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import "./UserRow.css";
import {groupsAPI} from "../../../services/GroupService";
import {Alert, AlertColor, Backdrop, CircularProgress, Snackbar} from "@mui/material";

interface userProps {
    id: string,
    name: string,
    role: string,
    badge?: string,
    setUpdateUserID: any,
    showEditModal: any
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    if(name.split(' ')[1] != undefined) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    } else {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.substring(0, 2)}`,
        };
    }

}


const UserRow:FC<userProps> = (props) => {

    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSuccess(false);
    };

    const ITEM_HEIGHT = 48;
    const [menuAnchorEl, setmenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setmenuAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setmenuAnchorEl(null);
    };

    const [deleteUserAPI, {data: deleteUserResponse, isLoading: deleteUserLoading}] = groupsAPI.useDeleteUserMutation()

    const editUser = () => {
        handleCloseMenu()
        props.setUpdateUserID(props.id)
        props.showEditModal()
    }
    const deleteUser = async () => {
        handleCloseMenu()
        if(window.confirm('Вы уверены? Это действие невозможно будет отменить.')) {
            await deleteUserAPI(props.id)
        }
    }
    useEffect(() => {
        if(deleteUserResponse && deleteUserResponse.response == "Success") {
            setAlertMessage('Пользователь удалён')
            setAlertSeverity('success')
            setAlertSuccess(true)
        } else if(deleteUserResponse && deleteUserResponse.response == "You have no permissions") {
            setAlertMessage('Вы не можете выполнить это действие. Обратитесь к администратору')
            setAlertSeverity('warning')
            setAlertSuccess(true)
        }
    }, [deleteUserResponse])
    useEffect(() => {
        if(deleteUserLoading == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [deleteUserLoading])

    return (
        <>
            <div className="container">
                <div className="left_content">
                    <Avatar {...stringAvatar(props.name)}/>
                    <p className="user_cell">{props.name}</p>
                    <p className="user_cell">{props.id}</p>
                    <p className="user_cell">{props.role}</p>
                </div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={menuAnchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem onClick={editUser}>Редактировать</MenuItem>
                    <MenuItem onClick={deleteUser}>Удалить</MenuItem>
                </Menu>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={alertSuccess}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{horizontal: "left", vertical: "top"}}
            >
                <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserRow;