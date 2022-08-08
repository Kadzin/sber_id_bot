import React, {FC, useState} from 'react';
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface addLinkProps {
    returnLinkFunc: any
}
const AddLink2Text:FC<addLinkProps> = (props) => {

    const [open, setOpen] = useState(false)

    const onAddLink = () => {
        handleClose()
        props.returnLinkFunc(linkValue)
    }

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const [linkValue, setLinkValue] = useState('');

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Укажите ссылку</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="link"
                        label="Ссылка"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={linkValue}
                        onChange={e => setLinkValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={onAddLink}>Вставить</Button>
                </DialogActions>
            </Dialog>
            <InsertLinkIcon onClick={handleClickOpen} sx={{cursor: 'pointer'}} />
        </div>
    );
};

export default AddLink2Text;