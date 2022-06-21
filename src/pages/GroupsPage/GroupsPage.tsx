import React, {useEffect, useState} from 'react';
import '../pages.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Alert, CardActionArea, IconButton, Snackbar, tableCellClasses, TextField} from '@mui/material';
import {groupsAPI} from "../../services/GroupService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {IGroups} from "../../models/IGroups";
import TransferList from "../../components/UI/TransferList/TransferList";
import Button from "../../components/UI/Button/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const GroupsPage = () => {

    const {isLoading, data: groups, error} = groupsAPI.useFetchGroupsQuery('')

    const [popupGroup, setPopupGroup] = useState<IGroups>({
        id: "",
        name: "",
        theme: "",
        chats: [{
            id: "",
            name: ""
        }],
        otherChats: [{
            id: "",
            name: ""
        }]
    })
    const [leftChats, setLeftChats] = useState<string[]>([""])

    const updateLeftChats = (chats: string[]) => {
        setLeftChats(chats)
    }


    const groupClick = (group: IGroups) => {
        setPopupGroup(group)
    }

    const generateImage = () => {
        const direction = Math.round(Math.random() * 360 / 4 + 45);

        const r1 = Math.round(Math.random() * (200 - 50) + 50);
        const g1 = Math.round(Math.random() * (200 - 50) + 50);
        const b1 = Math.round(Math.random() * (200 - 50) + 50);

        return `linear-gradient(${direction}deg, rgba(${r1},${g1},${b1},1), rgba(${r1},${g1},${b1},.2))`
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [openAddGroup, setOpenAddGroup] = React.useState(false);
    const handleOpenAddGroup = () => {
        setOpenAddGroup(true);
    };
    const handleCloseAddGroup = () => {
        setOpenAddGroup(false);
    };



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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#21a038",
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center"
        },
        [`&.${tableCellClasses.body}`]: {
            paddingRight: "50px",
            paddingLeft: "50px"
        }
    }));

    const StyledTableCellLeft = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            paddingRight: "50px",
            paddingLeft: "50px",
            borderRight: "1px solid #cecece"
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child th': {
            border: 0,
        },
    }));

    /*
    * Sending group's update to server (token: string; group_id: string; chats: string[]
    * Getting update status as response (response: string)
    * */
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [updateGroup, {data: postResponse}] = groupsAPI.useSetGroupInfoMutation()
    const updateGroupInfo = async () => {
        await updateGroup({
            id: popupGroup.id,
            chats: leftChats
        })
    }
    useEffect(() => {
        if(postResponse && postResponse.response == "Update success") {
            setAlertSuccess(true)
        }
    }, [postResponse])
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSuccess(false);
    };

    const [newGroupName, setNewGroupName] = useState('')
    const [newGroupNameError, setNewGroupNameError] = useState(false)
    const checkNewGroupName = (name: string) => {
        if(name.length > 40 || name.length < 0) {
            setNewGroupNameError(true)
            setNewGroupName('')
        } else {
            setNewGroupNameError(false)
            setNewGroupName(name)
        }
    }
    const [createGroupAPI, {data: createGroupResponse}] = groupsAPI.useAddGroupMutation()
    const createGroup = async () => {
        if(!newGroupNameError) {
            const groupName = newGroupName
            const groupTheme = generateImage()
            await createGroupAPI({
                name: groupName,
                theme: groupTheme
            })
        }
    }
    useEffect(() => {
        if(createGroupResponse && createGroupResponse.response == "Update success") {
            handleCloseAddGroup();
        }
    }, [createGroupResponse])

    const [removeGroupAPI, {data: removeGroupResponse}] = groupsAPI.useRemoveGroupMutation()
    const removeGroup = async (group_id: string) => {
        if(window.confirm('Вы уверены, что хотите удалить группу?')) {
            await removeGroupAPI(group_id)
        }
    }
    useEffect(() => {
        if(removeGroupResponse && removeGroupResponse.response == "Update success") {
            handleClose();
        }
    }, [removeGroupResponse])
    return (
        <>
            <p className="title">Управление группами</p>
            <p className="subtitle">В данном разделе вы сможете создать, удалить или отредактировать название группы.</p>
            <div className="box" style={{
                justifyContent: "left"
            }}>
            {isLoading && <p className="subtitle">Группы загружаются.</p>}
            {error && <p className="subtitle">Возникла ошибка при загрузке групп.</p>}
            {groups && groups.map((group) =>
                <Card key={group.id} sx={{
                    width: "300px",
                    height: "200px",
                    boxShadow: "5px 10px 20px -10px rgb(0 0 0 / 50%)",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    backgroundImage: group.theme
                }}>
                    <CardActionArea sx={{
                        height: "100%"
                    }} onClick={() => {
                        groupClick(group)
                        handleOpen()
                    }}>
                        <CardContent sx={{
                            background: "linear-gradient(to top, #ffffff 0%, #ffffff 80%, rgba(255, 255, 255, 0) 80%);",
                            height: "100%",
                            padding: "0 25px",
                            paddingTop: "22%",
                            boxSizing: "border-box"
                        }}>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center" sx={{
                                color: "#666666",
                                fontSize: "1.4rem"
                            }}>
                                {group.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Чатов в группе — {group.chats.length}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
                <Card sx={{
                    width: "300px",
                    height: "200px",
                    boxSizing: "border-box",
                    border: "1px solid #666",
                    borderRadius: "10px"
                }}>
                    <CardActionArea sx={{
                        height: "100%"
                    }} onClick={() => {
                        handleOpenAddGroup()
                    }}>
                        <CardContent>
                            <AddIcon sx={{
                                color: "#666666",
                                fontSize: "80px",
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            }}/>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            <p className="title">Список подключенных чатов:</p>
            <div className="box">
                <TableContainer component={Paper} sx={{ maxWidth: 600, width: "auto" }}>
                    <Table stickyHeader sx={{ maxWidth: 600, width: "auto" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Название чата</StyledTableCell>
                                <StyledTableCell>ID Чата</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups && groups[0].chats.map((chat) => (
                                <StyledTableRow
                                    key={chat.id}
                                    sx={{ '&:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCellLeft>{chat.name}</StyledTableCellLeft>
                                    <StyledTableCell>{chat.id}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={open}
                    onClose={handleClose}
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
                                fontSize: "1.4rem",
                                margin: "15px",
                                marginRight: "8px"
                            }}>
                                {popupGroup.name}
                            </Typography>
                            {popupGroup.id != '10000001' &&
                                <IconButton onClick={() => removeGroup(popupGroup.id)}>
                                <DeleteForeverIcon sx={{
                                    color: "#d01515",
                                    fontSize: "28px",
                                    margin: "0"
                                }}/>
                            </IconButton>

                            }
                        </div>
                        <TransferList groups={popupGroup} update={updateLeftChats} />
                        <Button disabled={false} align="center" theme="button_theme_green" value="Сохранить" style={{
                            marginTop: "20px",
                            marginBottom: "10px"
                        }} onClick={updateGroupInfo} />
                    </Box>
                </Modal>
                {/*————————————————————————————————————————————————————*/}
                <Modal
                    open={openAddGroup}
                    onClose={handleCloseAddGroup}
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
                                error={newGroupNameError}
                                id="standard-required"
                                label="Не более 40 символов"
                                defaultValue=""
                                placeholder="New group"
                                variant="standard"
                                sx={{
                                    width: "400px"
                                }}
                                onChange={(e) => checkNewGroupName(e.target.value)}
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
                            onClick={createGroup}
                        />
                    </Box>
                </Modal>
            </div>
            <Snackbar
                open={alertSuccess}
                autoHideDuration={1000}
                onClose={handleCloseAlert}
                anchorOrigin={{horizontal: "left", vertical: "top"}}
            >
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Изменения успешно сохранены
                </Alert>
            </Snackbar>
        </>
    );
};

export default GroupsPage;