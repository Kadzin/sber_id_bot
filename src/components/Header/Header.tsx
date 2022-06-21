import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import "./Header.css";
import { styled } from '@mui/material/styles';
import {groupsAPI} from "../../services/GroupService";
import {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 60,
        paddingTop: 10
    },
}));


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



const Header = () => {

    const cookies = document.cookie.split("; ").map(c => {
        return {name: c.split("=")[0], value: c.split("=")[1]}
    })
    const cookie = cookies.filter(c => c.name == 'btsc')

    const [logoutRequest, {data: logoutResponse}] = groupsAPI.useLogoutMutation()
    const logout = () => {
        if(cookie.length != 0) {
            logoutRequest(cookie[0].value)
        } else {
            document.location.reload()
        }
    }
    useEffect(() => {
        if(logoutResponse && logoutResponse.response == 'true') {
            document.cookie = "btsc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.location.reload()
        }
    }, [logoutResponse])



    const {data: users, isSuccess: userFetchStatus} = groupsAPI.useGetUserQuery(cookie[0].value)
    const [userName, setUserName] = useState('User')
    useEffect(() => {
        if(users && users.id != '00000000') {
            setUserName(users.name)
        } else if(users && users.id == '00000000') {
            logout()
        }
    }, [users])


    return (
        <header className='background'>
            <div className='elems'>
                <img alt="logo" src="https://nse-work.ru/test/build/assets/SberID_logo.svg" />
                <div className='right_items'>
                    <div className='user'>
                        <Avatar {...stringAvatar(userName)}/>
                        <p>{userName}</p>
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

    /*return (
        <AppBar position="static" sx={{
            backgroundColor: "#fafafc"
        }}>
            <Container maxWidth="xl">
                <StyledToolbar sx={{
                    minHeight: "100px"
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={1} />
                        <Grid item xs={2} sx={{
                            alignSelf:"center"
                        }}>
                            <img alt="logo" src="https://nse-work.ru/test/build/assets/sber_logo_main_7d73a15d4b.4eee7bc98b3c629a0522.png" />
                        </Grid>
                        <Grid item xs >
                            <Typography variant="h5" gutterBottom component="div" sx={{
                                color: "#000000"
                            }}>
                                Сбер ID team bot
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button disabled={false} align="" theme="button_theme_red" value="Выход" onClick={logout} />
                        </Grid>
                    </Grid>
                </StyledToolbar>
            </Container>
        </AppBar>
    );*/
};

export default Header;