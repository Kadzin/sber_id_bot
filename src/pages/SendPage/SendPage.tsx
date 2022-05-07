import React, {useEffect, useState} from 'react';
import '../pages.css'
import Textarea from "../../components/UI/Textarea/Textarea";
import GroupsList from "../../components/UI/GroupList/GroupList";
import Button from "../../components/UI/Button/Button";

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


    return (
        <>
            <p className="title">Отправить сообщение:</p>
            <Textarea onChange={setFromatedText} />
            <p className="subtitle">Выберете группу для рассылки:</p>
            <GroupsList onSelected={setCurrentGroup} />
            <Button disabled={sendData.buttonActive} align="left" theme="button_theme_green" value="Отправить" />
        </>
    );
};

export default SendPage;