import React, {FC, useEffect, useState} from 'react';
import {
    Alert,
    AlertColor,
    Backdrop,
    Chip,
    CircularProgress,
    Divider, FormControl, FormControlLabel, FormLabel,
    MenuItem, Radio, RadioGroup,
    Snackbar,
    TextField
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../Button/Button";
import './UpdateUser.css';
import {groupsAPI} from "../../../services/GroupService";

interface modalProps {
    id: string,
    userRole: string,
    openModal: boolean,
    closeCallback: any
}

const UpdateUser:FC<modalProps> = (props) => {

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

    const [nameErrorValue, setNameErrorValue] = useState(false)
    const [nameValue, setNameValue] = useState('')
    const handleNameChange = (value: string) => {
        setNameValue(value)
    }

    const checkFormData = () => {
        if(nameValue != '') {
            setNameErrorValue(false)
            updateUser('name')
        } else {
            setNameErrorValue(true)
        }
    }

    const changeUserRole = () => {
        if(window.confirm('Вы уверены, что хотите изменить права пользователя? Если вы поменяете для себя, то не сможете вернуться в этот раздел!')) {
            updateUser('role')
        }
    }

    const resetPass = () => {
        if(window.confirm('Вы уверены, что хотите сбросить пароль пользователя? Это действие невозможно отменить')) {
            updateUser('pass')
        }
    }

    const [updateUserAPI, {data: updateUserResponse, isLoading: updateUserIsLoading}] = groupsAPI.useUpdateUserMutation()

    const updateUser = async (action: string) => {
        await updateUserAPI({
            action: action,
            id: props.id,
            name: nameValue,
            role: radioButtonsValue
        })
    }
    useEffect(() => {
        if(updateUserResponse && updateUserResponse.response == "Success") {
            setAlertMessage('Запрос выполнен успешно')
            setAlertSeverity('success')
            setAlertSuccess(true)
            props.closeCallback()
        } else if(updateUserResponse && updateUserResponse.response == "You have no permissions") {
            setAlertMessage('Вы не можете выполнить это действие. Обратитесь к администратору')
            setAlertSeverity('warning')
            setAlertSuccess(true)
        }
    }, [updateUserResponse])
    useEffect(() => {
        if(updateUserIsLoading == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [updateUserIsLoading])

    const [radioButtonsValue, setRadioButtonsValue] = React.useState('');
    const [radioButtonFlag, setRadioButtonFlag] = useState(false)
    const handleRadioButtons = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioButtonsValue((event.target as HTMLInputElement).value);
    };
    useEffect(() => {
        setRadioButtonsValue(props.userRole)
    }, [props.userRole])

    useEffect(() => {
        if(radioButtonFlag) {
            setRadioButtonFlag(false)
            changeUserRole()
        }
    }, [radioButtonsValue])

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
                        Редактировать данные пользователя
                    </Typography>
                    <Divider sx={{ margin: "0 0 25px 0" }} />
                    <p className='content-container-description'>
                        Вы можете изменить имя пользователя, права доступа, а также сбросить пароль (пользователя при это разлогинит из сервиса и необходимо будет заново активировать аккаунт в телеграме)
                    </p>
                    <Divider sx={{ margin: "25px 0 0 0" }} />
                    <div className='content-container'>
                        <div className='half-width-cell'>
                            <TextField
                                required
                                error={nameErrorValue}
                                id="user-new-name"
                                label="Новое имя пользователя"
                                variant="standard"
                                placeholder="Имя Пользователя"
                                sx={inputStyles}
                                value={nameValue}
                                onChange={(e) => handleNameChange(e.target.value)}
                            />
                        </div>
                        <div className='half-width-cell'>
                            <Button disabled={false} align="flex" theme="button_theme_green" value="Изменить" onClick={checkFormData} />
                        </div>
                    </div>
                    <Divider>
                        <Chip label="ИЛИ" />
                    </Divider>
                    <div className='content-container'>
                        <FormControl sx={{margin: "25px"}}>
                            <FormLabel id="new-user-rights">Права доступа</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="new-user-rights-radio-buttons"
                                name="new-user-rights-radio-buttons-group"
                                value={radioButtonsValue}
                                onChange={handleRadioButtons}
                                onClick={() => setRadioButtonFlag(true)}
                            >
                                <FormControlLabel value="user" control={<Radio />} label="Пользователь" />
                                <FormControlLabel value="moderator" control={<Radio />} label="Модератор" />
                                <FormControlLabel value="administrator" control={<Radio />} label="Администратор" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider>
                        <Chip label="ИЛИ" />
                    </Divider>
                    <Button disabled={false} align="center" theme="button_theme_red" value="Сбросить пароль" style={{
                        marginTop: "20px",
                        marginBottom: "10px"
                    }} onClick={resetPass} />
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

export default UpdateUser;