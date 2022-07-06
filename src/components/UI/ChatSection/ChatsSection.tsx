import React, {FC, useState} from 'react';
import {IChats} from "../../../models/IChats";
import './ChatsSection.css'
import {Stack, TextField} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UserRow from "../UserRow/UserRow";
import ChatRow from "../ChatRow/ChatRow";
import {groupsAPI} from "../../../services/GroupService";

interface chatsSectionProps {
    chats: IChats[]
}

const ChatsSection:FC<chatsSectionProps> = (props) => {

    const {data: userData, isLoading: userDataIsLoading, error: userDataError} = groupsAPI.useGetUserQuery('')

    const [searchValue, setSearchValue] = useState('')

    return (
        <div className='chats-container'>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                    padding: "0 25px 25px 25px",
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
            </div>
            <Stack
                direction='column'
                alignItems='stretch'
                justifyContent='flex-start'
                spacing={2}
            >
                {props.chats && props.chats.map((chat) => {
                    let isForUsers
                    if(chat.role == 'user') {
                        isForUsers = true
                    } else {
                        isForUsers = false
                    }
                    if(chat.name.toLowerCase().includes(searchValue.toLowerCase()) && userData) {
                        return (
                            <ChatRow name={chat.name} id={chat.id} isForUsers={isForUsers} userRole={userData.role} />
                        )}
                    }
                )}
            </Stack>
        </div>
    );
};

export default ChatsSection;