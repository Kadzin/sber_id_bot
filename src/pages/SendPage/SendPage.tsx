import React, {useEffect, useState} from 'react';
import '../pages.css'
import Textarea from "../../components/UI/Textarea/Textarea";
import GroupsList from "../../components/UI/GroupList/GroupList";
import Button from "../../components/UI/Button/Button";
import {groupsAPI} from "../../services/GroupService";
import {
    Alert,
    Autocomplete, AutocompleteValue,
    Backdrop,
    CircularProgress,
    Snackbar, TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import ChatsAutocomplete from "./Autocomplete/ChatsAutocomplete";
import GroupsAutocomplete from "./Autocomplete/GroupsAutocomplete";

interface chats {
    label: string,
    id: string
}

const SendPage = () => {

    const {isLoading, data: groups, error} = groupsAPI.useFetchGroupsQuery('')

    const [sendData, setSendData] = useState({
        formatedText: '',
        groupID: '',
        buttonActive: true
    })

    useEffect(() => {
        if(sendData.formatedText.trim() != '' && sendData.groupID != '' || sendData.formatedText.trim() != '' && chats2Send?.length && chats2Send.length != 0) {
            setSendData({...sendData, buttonActive: false})
        } else {
            setSendData({...sendData, buttonActive: true})
        }
    }, [sendData.formatedText, sendData.groupID])

    const setFromatedText = (text: string) => {
        setSendData({...sendData, formatedText: text})
    }

    const setCurrentGroup = (group_id: string) => {
        setSendData({...sendData, groupID: group_id})
    }


    const [sendMessageAPI, {data: sendMessageResponse, isLoading: sendMessageStatus}] = groupsAPI.useSendMessageMutation()
    const [sendMessage2ChatAPI, {data: sendMessage2ChatResponse, isLoading: sendMessage2ChatStatus}] = groupsAPI.useSendMessage2ChatMutation()

    const sendMessageHandler = () => {
        if(chats2Send?.length && chats2Send.length != 0) {
            sendMessage2Chat()
        } else if(sendData.formatedText.trim() != '' && sendData.groupID != '') {
            sendMessage()
        }
    }

    const sendMessage2Chat = async () => {
        await sendMessage2ChatAPI({
            chat_id: JSON.stringify(chats2Send),
            message: sendData.formatedText
        })
    }
    useEffect(() => {
        if(sendMessage2ChatResponse && sendMessage2ChatResponse.response == "Success") {
            setAlertSuccess(true)
            setSendData({
                formatedText: '',
                groupID: '',
                buttonActive: true
            })
        }
    }, [sendMessage2ChatResponse])

    const sendMessage = async () => {
        await sendMessageAPI({
            id: sendData.groupID,
            message: sendData.formatedText
        })
    }
    useEffect(() => {
        if(sendMessageResponse && sendMessageResponse.response == "Success") {
            setAlertSuccess(true)
            setSendData({
                formatedText: '',
                groupID: '',
                buttonActive: true
            })
        }
    }, [sendMessageResponse])

    const [alertSuccess, setAlertSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        if(sendMessage2ChatStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [sendMessage2ChatStatus])
    useEffect(() => {
        if(sendMessageStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [sendMessageStatus])
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSuccess(false);
    };

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const [chats2Send, setChats2Send] = useState<any[] | null>()
    useEffect(() => {
        if(chats2Send == null) {
            setSendData({...sendData, buttonActive: true})
        } else {
            if(sendData.formatedText.trim() != '' && chats2Send?.length && chats2Send.length != 0) {
                setSendData({...sendData, buttonActive: false})
            } else {
                setSendData({...sendData, buttonActive: true})
            }
        }
    }, [chats2Send])




    const [alignment, setAlignment] = React.useState('group');
    useEffect(() => {
        setChats2Send([])
        setSendData({...sendData, buttonActive: true, groupID: ''})
    }, [alignment])

    const handleAutocomplete = (value: any, type: string) => {
        switch (type) {
            case 'group':
                setCurrentGroup(value.id)
                break
            case 'chat':
                setChats2Send(value)
                break
            default:
                break
        }
    }




    const autocompletes = () => {
        if(groups) {
            switch (alignment) {
                case 'group':
                    return (
                        <GroupsAutocomplete
                            callback={handleAutocomplete}
                            options={groupsAutocomplete}
                        />
                    )
                    break
                case 'chat':
                    return (
                        <ChatsAutocomplete
                            callback={handleAutocomplete}
                            options={chatsAutocomplete}
                        />
                    )
                    break
                default:
                    break
            }
        }
    }
    const [groupsAutocomplete, setGroupsAutocomplete] = useState<any[]>([])
    const [chatsAutocomplete, setChatsAutocomplete] = useState<any[]>([])
    useEffect(() => {
        if(groups) {
            setGroupsAutocomplete(() => {
                return groups.map((group) => {
                    return {
                        id: group.id,
                        label: group.name
                    }
                })
            })
            setChatsAutocomplete(() => {
                return groups[0].chats.map((chat) => {
                    return {
                        id: chat.id,
                        label: chat.name
                    }
                })
            })
        }
    }, [groups])

    const toggleButtonTheme = {
        fontSize: '14px',
        padding: '8px 25px',
        textTransform: 'unset'
    }

    return (
        <>
            <Textarea onChange={setFromatedText} />
            <p className="subtitle">Выберите способ отправки рассылки:</p>
            <ToggleButtonGroup
                color="standard"
                value={alignment}
                exclusive
                onChange={handleChange}
                sx={{
                    float: 'left',
                    margin: '0 0 25px 0'
                }}
            >
                <ToggleButton value="group" sx={toggleButtonTheme}>В группу</ToggleButton>
                <ToggleButton value="chat" sx={toggleButtonTheme}>Адресно</ToggleButton>
            </ToggleButtonGroup>
            <div>
                {autocompletes()}
            </div>
            <div style={{width: '100%', float: 'left'}}>
                <Button
                    disabled={sendData.buttonActive}
                    align="left"
                    theme="button_theme_green"
                    value="Отправить"
                    onClick={sendMessageHandler}
                />
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
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Сообщения были успешно отправлены
                </Alert>
            </Snackbar>
        </>
    );
};

export default SendPage;