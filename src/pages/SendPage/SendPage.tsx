import React, {useEffect, useState} from 'react';
import '../pages.css'
import Textarea from "../../components/UI/Textarea/Textarea";
import GroupsList from "../../components/UI/GroupList/GroupList";
import Button from "../../components/UI/Button/Button";
import {groupsAPI} from "../../services/GroupService";
import {Alert, Backdrop, CircularProgress, Snackbar} from "@mui/material";

const SendPage = () => {


    const [sendData, setSendData] = useState({
        formatedText: '',
        groupID: '',
        buttonActive: true
    })

    useEffect(() => {
        if(sendData.formatedText.trim() != '' && sendData.groupID != '') {
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

    const sendMessage = async () => {
        await sendMessageAPI({
            id: sendData.groupID,
            message: sendData.formatedText
        })
    }
    useEffect(() => {
        if(sendMessageResponse && sendMessageResponse.response == "Success") {
            setAlertSuccess(true)
        }
    }, [sendMessageResponse])

    const [alertSuccess, setAlertSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
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

    return (
        <>
            <p className="title">Отправить сообщение</p>
            <Textarea onChange={setFromatedText} />
            <p className="subtitle">Выберете группу для рассылки:</p>
            <GroupsList onSelected={setCurrentGroup} />
            <Button
                disabled={sendData.buttonActive}
                align="left"
                theme="button_theme_green"
                value="Отправить"
                onClick={sendMessage}
            />
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