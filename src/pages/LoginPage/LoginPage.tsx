import React, {useState} from 'react';
import '../pages.css'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TransferList from "../../components/UI/TransferList/TransferList";
import Button from "../../components/UI/Button/Button";
import Modal from "@mui/material/Modal";

const LoginPage = () => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: '#fff',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        boxSizing: "border-box",
        borderRadius: "10px"
    };

    const [id, setId] = useState<string>('')
    const [pass, setPass] = useState<string>('')

    return (
        <>
            <Modal
                open={true}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <Typography gutterBottom component="div" textAlign="center" sx={{
                            color: "#000000",
                            fontSize: "24px",
                            margin: "15px",
                            marginRight: "8px"
                        }}>
                            Введите ваш telegram id и пароль
                        </Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        height: "auto",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginBottom: "25px"
                    }}>
                        <TextField
                            value={id}
                            required
                            error={false}
                            id="standard-required"
                            label="Telegram ID"
                            variant="standard"
                            sx={{
                                width: "400px",
                                margin: "10px auto"
                            }}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            value={pass}
                            type={'password'}
                            required
                            error={false}
                            id="standard-required"
                            label="Пароль"
                            variant="standard"
                            sx={{
                                width: "400px",
                                margin: "10px auto"
                            }}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <Button
                        disabled={false}
                        align="center"
                        theme="button_theme_green"
                        value="Войти"
                        style={{
                            marginTop: "20px",
                            marginBottom: "10px"
                        }}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default LoginPage;