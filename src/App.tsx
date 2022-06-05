import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {Link, Outlet} from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import {groupsAPI} from "./services/GroupService";

function App() {

    const [isAuthed, setIsAuthed] = useState(false)


    const [checkCookie, {data: checkCookieResponse}] = groupsAPI.useCheckCookieMutation()

    const cookies = document.cookie.split("; ").map(c => {
        return {name: c.split("=")[0], value: c.split("=")[1]}
    })
    const cookie = cookies.filter(c => c.name == 'btsc')

    useEffect(() => {
        if(cookie.length != 0) {
            checkCookie(cookie[0].value)
        } else {
            setIsAuthed(false)
        }
    }, [])

    useEffect(() => {
        if(checkCookieResponse && checkCookieResponse.response == 'true') {
            setIsAuthed(true)
        } else {
            setIsAuthed(false)
        }
    }, [checkCookieResponse])


    if(!isAuthed) {
        return (
            <LoginPage />
        )
    }

    return (
        <>
            <Header />
            <Box
                sx={{
                    maxWidth: 1200,
                    height: "auto",
                    margin: "auto"
                }}
            >
                <NavBar />
                <Outlet />
            </Box>
        </>
    );
}

export default App;
