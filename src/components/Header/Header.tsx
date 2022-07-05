import * as React from 'react';
import "./Header.css";
import {groupsAPI} from "../../services/GroupService";
import {FC, useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';


interface headerProps {
    userName: string;
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




const Header:FC<headerProps> = (props) => {

    const [logoutRequest, {data: logoutResponse}] = groupsAPI.useLogoutMutation()
    const logout = () => {
        logoutRequest('')
    }
    useEffect(() => {
        if(logoutResponse && logoutResponse.response == 'true') {
            document.location.reload()
        }
    }, [logoutResponse])


    return (
        <header className='background'>
            <div className='elems'>
                <img alt="logo" src="https://nse-work.ru/test/build/assets/SberID_logo.svg" />
                <div className='right_items'>
                    <div className='user'>
                        <Avatar {...stringAvatar(props.userName)}/>
                        <p style={{fontFamily: 'Arial'}}>{props.userName}</p>
                    </div>
                    <LogoutIcon
                        sx={{
                            color: '#df4040',
                            cursor: 'pointer'
                        }}
                        onClick={logout}
                    />
                </div>
            </div>
        </header>
    )
};

export default Header;