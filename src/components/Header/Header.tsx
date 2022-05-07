import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "./Header.module.css";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from "../UI/Button/Button";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 60,
        paddingTop: 10
    },
}));

const Header = () => {


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
                            <Button disabled={false} align="" theme="button_theme_red" value="Выход" />
                        </Grid>
                    </Grid>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
};

export default Header;