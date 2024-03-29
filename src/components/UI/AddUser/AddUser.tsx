import React, {FC, useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, AlertColor, Backdrop, CircularProgress, Divider, MenuItem, Snackbar, TextField} from "@mui/material";
import Button from "../Button/Button";
import './AddUser.css'
import userRow from "../UserRow/UserRow";
import {groupsAPI} from "../../../services/GroupService";

interface modalProps {
    openModal: boolean,
    closeCallback: any
}

const AddUser:FC<modalProps> = (props) => {

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

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: '#fff',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        boxSizing: "border-box",
        borderRadius: "10px"
    };

    const inputStyles = {
        width: '250px',
        margin: '25px'
    }

    const [idValue, setIdValue] = useState('')
    const handleIdChange = (value: string) => {
        setIdValue(value)
    }
    const [roleSelect, setRoleSelect] = useState('user')
    const handleRoleSelect = (value: string) => {
        setRoleSelect(value)
    }
    const [idErrorValue, setIdErrorValue] = useState(false)

    const checkFormData = () => {
        if(idValue != '') {
            setIdErrorValue(false)
            addUser(idValue, roleSelect)
        } else {
            setIdErrorValue(true)
        }
    }

    const [addUserAPI, {data: addUserResponse, isLoading: addUserIsLoading}] = groupsAPI.useAddUserMutation()
    const addUser = async (id: string, role: string) => {
        await addUserAPI({
            id: id,
            role: role
        })
    }
    useEffect(() => {
        if(addUserResponse && addUserResponse.response == "Success") {
            setAlertMessage('Пользователь успешно добавлен')
            setAlertSeverity('success')
            setAlertSuccess(true)
            handleIdChange('')
            setRoleSelect('user')
        } else if(addUserResponse && addUserResponse.response == "You have no permissions") {
            setAlertMessage('Вы не можете выполнить это действие. Обратитесь к администратору')
            setAlertSeverity('warning')
            setAlertSuccess(true)
            handleIdChange('')
            setRoleSelect('user')
        }
    }, [addUserResponse])
    useEffect(() => {
        if(addUserIsLoading == false) {
            setLoader(false)
            props.closeCallback()
        } else {
            setLoader(true)
        }
    }, [addUserIsLoading])

    return (
        <>
            <Modal
                open={props.openModal}
                onClose={props.closeCallback}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style}}>
                    <Typography gutterBottom component="div" textAlign="center" sx={{
                        color: "#000000",
                        fontSize: "24px",
                        margin: "15px"
                    }}>
                        Добавить нового пользователя
                    </Typography>
                    <Divider sx={{ margin: "0 0 25px 0" }} />
                    <p className='content-container-description'>
                        Для регистрации нового пользователя укажите его id телеграм (как узнать <a target="_blank" href="https://messenge.ru/kak-uznat-id-telegram/">читай тут</a>),<br />
                        а также выберете тип доступа.<br />
                        После создания аккаунта пользователю необходимо будет активировать аккаунт самостоятельно.<br />
                        Для этого необходимо будет написать чат боту в личку и придумать пароль.
                    </p>
                    <Divider sx={{ margin: "25px 0 0 0" }} />
                    <div className='content-container'>
                        <TextField
                            required
                            error={idErrorValue}
                            id="telegram-id"
                            label="Telegram ID"
                            variant="standard"
                            placeholder="12345678"
                            sx={inputStyles}
                            value={idValue}
                            onChange={(e) => handleIdChange(e.target.value)}
                        />
                        <TextField
                            id="role"
                            select
                            label="Укажите права для пользователя"
                            value={roleSelect}
                            onChange={(e) => handleRoleSelect(e.target.value)}
                            variant="standard"
                            sx={inputStyles}
                        >
                            <MenuItem value="user">user</MenuItem>
                            <MenuItem value="moderator">moderator</MenuItem>
                            <MenuItem value="administrator">administrator</MenuItem>
                        </TextField>
                    </div>
                    <Button disabled={false} align="center" theme="button_theme_green" value="Создать" style={{
                        marginTop: "20px",
                        marginBottom: "10px"
                    }} onClick={checkFormData} />
                </Box>
            </Modal>
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

export default AddUser;