import React, {useEffect, useState} from 'react';
import '../pages.css'
import {groupsAPI} from "../../services/GroupService";
import ExpandableCard from "../../components/UI/ExpandableCard/ExpandableCard";
import {Alert, AlertColor, Backdrop, CircularProgress, Snackbar} from "@mui/material";
import {IMessage} from "../../models/IMessage";

const MessagesPage = () => {

    const [severity, setSeverity] = useState<AlertColor | undefined>('success')

    const {isLoading, data: messagesList, error} = groupsAPI.useGetMessagesQuery('')

    const [updateMessageAPI, {data: updateMessageResponse, isLoading: updateMessageStatus}] = groupsAPI.useUpdateMessageMutation()

    const updateMessage = async (message_id: string, message: string) => {
        await updateMessageAPI({
            id: message_id,
            message: message
        })
    }
    useEffect(() => {
        if(updateMessageResponse && updateMessageResponse.response == "Success") {
            setAlertMessage('Сообщения обновлены')
            setAlertSuccess(true)
            setSeverity('success')
        }
    }, [updateMessageResponse])


    const [deleteMessageAPI, {data: deleteMessageResponse, isLoading: deleteMessageStatus}] = groupsAPI.useDeleteMessageMutation()

    const deleteMessage = async (message_id: string) => {
        await deleteMessageAPI(message_id)
    }

    useEffect(() => {
        if(deleteMessageResponse && deleteMessageResponse.response == "Success") {
            setAlertMessage('Сообщение удалено')
            setAlertSuccess(true)
            setSeverity('success')
        }
    }, [deleteMessageResponse])


    const [deleteChatMessageAPI, {data: deleteChatMessageResponse, isLoading: deleteChatMessageStatus}] = groupsAPI.useDeleteMessageFromChatMutation()

    const deleteChatMessage = async (parent_message_id: string, chat_id: string, message_id: string) => {
        await deleteChatMessageAPI({
            chat_id: chat_id,
            message_id: message_id,
            parent_message_id: parent_message_id
        })
    }

    useEffect(() => {
        if(deleteChatMessageResponse && deleteChatMessageResponse.response == "Success") {
            setAlertMessage('Сообщение удалено')
            setAlertSuccess(true)
            setSeverity('success')
        }
    }, [deleteChatMessageResponse])

    const [loader, setLoader] = useState(false)
    useEffect(() => {
        if(updateMessageStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [updateMessageStatus])
    useEffect(() => {
        if(deleteMessageStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [deleteMessageStatus])
    useEffect(() => {
        if(deleteChatMessageStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [deleteChatMessageStatus])

    const [pinMessageAPI, {data: pinMessageResponse, isLoading: pinMessageStatus}] = groupsAPI.usePinMessageMutation()

    const pinMessage = async (parent_id: string, chat_id: string, message_id: string) => {
        await pinMessageAPI({
            chat_id: chat_id,
            message_id: message_id,
            parent_message_id: parent_id
        })
    }
    useEffect(() => {
        if(pinMessageResponse && pinMessageResponse.response == "Success") {
            setAlertMessage('Сообщение закреплено')
            setAlertSuccess(true)
            setSeverity('success')
        }
        if(pinMessageResponse && pinMessageResponse.response == "No rights") {
            setAlertMessage('У бота нет прав в чате для закрепления сообщения')
            setAlertSuccess(true)
            setSeverity('error')
        }
        if(pinMessageResponse && pinMessageResponse.response == "No rights (all)") {
            setAlertMessage('У бота не во всех чатах есть права для закрепления сообщения')
            setAlertSuccess(true)
            setSeverity('error')
        }
    }, [pinMessageResponse])
    useEffect(() => {
        if(pinMessageStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [pinMessageStatus])

    const [unpinMessageAPI, {data: unpinMessageResponse, isLoading: unpinMessageStatus}] = groupsAPI.useUnpinMessageMutation()

    const unpinMessage = async (parent_id: string, chat_id: string, message_id: string) => {
        await unpinMessageAPI({
            chat_id: chat_id,
            message_id: message_id,
            parent_message_id: parent_id
        })
    }
    useEffect(() => {
        if(unpinMessageResponse && unpinMessageResponse.response == "Success") {
            setAlertMessage('Сообщение откреплено')
            setAlertSuccess(true)
            setSeverity('success')
        }
        if(unpinMessageResponse && unpinMessageResponse.response == "No rights") {
            setAlertMessage('У бота нет прав в чате для открепления сообщения')
            setAlertSuccess(true)
            setSeverity('error')
        }
        if(unpinMessageResponse && unpinMessageResponse.response == "No rights (all)") {
            setAlertMessage('У бота не во всех чатах есть права для открепления сообщения')
            setAlertSuccess(true)
            setSeverity('error')
        }
    }, [unpinMessageResponse])
    useEffect(() => {
        if(unpinMessageStatus == false) {
            setLoader(false)
        } else {
            setLoader(true)
        }
    }, [unpinMessageStatus])


    const [alertMessage, setAlertMessage] = useState('')
    const [alertSuccess, setAlertSuccess] = useState(false)
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSuccess(false);
    };

    return (
        <div>
            {messagesList && messagesList.map((message)  => {

                if(message.id == '0') {
                    return (
                        <p key={message.id}>История сообщений пуста</p>
                    )
                }

                let pinned = false
                message.pinned == '1' ? pinned = true : pinned = false

                return (
                    <div key={message.id}>
                        <ExpandableCard
                            id={message.id}
                            groupName={message.group_name}
                            date={message.date}
                            messageText={message.text}
                            chatMessages={message.messages}
                            pinned={pinned}
                            updateMessageCallback={updateMessage}
                            deleteMessageCallback={deleteMessage}
                            deleteChatMessageCallback={deleteChatMessage}
                            pinMessageCallback={pinMessage}
                            unpinMessageCallback={unpinMessage}
                        />
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, .2)' }}
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
                            <Alert onClose={handleCloseAlert} severity={severity} sx={{ width: '100%' }}>
                                {alertMessage}
                            </Alert>
                        </Snackbar>
                    </div>
                    )
                }
            )}
        </div>
    );
};

export default MessagesPage;