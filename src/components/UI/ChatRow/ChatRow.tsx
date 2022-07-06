import React, {FC, useEffect, useState} from 'react';
import './ChatRow.css'
import Avatar from "@mui/material/Avatar";
import {Alert, AlertColor, Backdrop, CircularProgress, FormControlLabel, Snackbar, Switch} from "@mui/material";
import {groupsAPI} from "../../../services/GroupService";

interface chatRowProps {
    name: string,
    id: string,
    isForUsers: boolean,
    userRole: string
}

const ChatRow:FC<chatRowProps> = (props) => {

    const [checked, setChecked] = React.useState(props.isForUsers);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const [loader, setLoader] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [openAlertFlag, setOpenAlertFlag] = useState(false)
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };
    const [alertMessage, setAlertMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')

    const [updateChatAPI, {data: updateChatResponse, isLoading: updateChatIsLoading}] = groupsAPI.useUpdateChatMutation()

    useEffect(() => {
        if(openAlertFlag) {
            setOpenAlert(false)
            if(checked) {
                updateChat(props.id, 'user')
            } else {
                updateChat(props.id, 'moderator')
            }
        }
    }, [checked])

    const updateChat = async (chat_id: string, chat_role: string) => {
        await updateChatAPI({
            chat_id: chat_id,
            chat_role: chat_role
        })
    }
    useEffect(() => {
        if(updateChatIsLoading) {
            setLoader(true)
        } else {
            setLoader(false)
        }
    }, [updateChatIsLoading])
    useEffect(() => {
        if(updateChatResponse && updateChatResponse.response == "Success") {
            setAlertMessage('Изменения успешно сохранены')
            setAlertSeverity('success')
            setOpenAlert(true)
        } else if(updateChatResponse && updateChatResponse.response == "Access denied" || updateChatResponse && updateChatResponse.response == "Request error" ){
            setAlertMessage('Вознкла ошибка при сохранени изменений')
            setAlertSeverity('error')
            setOpenAlert(true)
        }
    }, [updateChatResponse])

    const chatControl = () => {
        if(props.userRole != 'user') {
            return (
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            onClick={() => setOpenAlertFlag(true)}
                        />
                    }
                    label="Доступно всем пользователям"
                />
            )
        }
    }

    return (
        <>
            <div className="chat-row-container">
                <div className="left_content">
                    <p className="user_cell">{props.name}</p>
                    <p className="user_cell">{props.id}</p>
                </div>
                {chatControl()}
            </div>
            {/*———————————————————————————————————————————————————————————————*/}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openAlert}
                autoHideDuration={500}
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

export default ChatRow;