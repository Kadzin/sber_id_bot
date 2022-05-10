import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "./Header.module.css";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from "../UI/Button/Button";
import {groupsAPI} from "../../services/GroupService";
import {useEffect} from "react";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 60,
        paddingTop: 10
    },
}));




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

    return (
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
    );
};

export default Header;