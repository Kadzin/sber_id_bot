import React, {FC} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Snackbar, TextField} from "@mui/material";
import Button from "../Button/Button";

interface modalProps {
    openModal: boolean,
    closeModal: boolean,
    closeCallback: any
}

const AddUser:FC<modalProps> = (props) => {

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

    const [openAddGroup, setOpenAddGroup] = React.useState(false);
    const handleOpenAddGroup = () => {
        setOpenAddGroup(true);
    };
    const handleCloseAddGroup = () => {
        setOpenAddGroup(false);
    };



    return (
        <Modal
            open={props.openModal}
            onClose={props.closeCallback}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style}}>
                <Typography gutterBottom component="div" textAlign="center" sx={{
                    color: "#000000",
                    fontSize: "24px",
                    margin: "15px"
                }}>
                    Напишите название новой группы
                </Typography>
                <Box sx={{
                    width: "100%;",
                    display: "flex",
                    justifyContent: "center",
                    margin: "25px 0"
                }}>
                    <TextField
                        required
                        id="standard-required"
                        label="Не более 40 символов"
                        defaultValue=""
                        placeholder="New group"
                        variant="standard"
                        sx={{
                            width: "400px"
                        }}
                    />
                </Box>
                <Button
                    disabled={false}
                    align="center"
                    theme="button_theme_green"
                    value="Создать"
                    style={{
                        marginTop: "20px",
                        marginBottom: "10px"
                    }}
                    onClick={() => console.log('click')}
                />
            </Box>
        </Modal>
    );
};

export default AddUser;