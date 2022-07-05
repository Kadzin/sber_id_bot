import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {Link, Outlet} from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import {groupsAPI} from "./services/GroupService";
import {Backdrop, CircularProgress} from "@mui/material";

function App() {

    const {data: authResponse, isLoading: authIsLoading, error: authError} = groupsAPI.useAuthQuery('')


    if(authIsLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, .2)' }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    if(authResponse && authResponse.status == 'ok') {
        return (
            <>
                <Header userName={authResponse.userName} />
                <Box
                    sx={{
                        maxWidth: 1200,
                        height: "auto",
                        margin: "auto"
                    }}
                >
                    <NavBar role={authResponse.role} />
                    <Outlet />
                </Box>
            </>
        )
    } else {
        return (
            <LoginPage />
        )
    }
}

export default App;
