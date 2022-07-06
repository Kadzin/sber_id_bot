import React, {FC, useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Textarea from "../Textarea/Textarea";
import PushPinIcon from '@mui/icons-material/PushPin';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreContexMenu from "./MoreContexMenu/MoreContexMenu";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface ExpandableCardProps {
    id: string,
    groupName: string,
    date: string,
    messageText: string,
    pinned?: boolean,
    chatMessages: {
        chat_id: string,
        chat_name: string,
        message_id: string,
        pinned: string
    }[],
    author: string,
    updateMessageCallback: any,
    deleteMessageCallback: any,
    deleteChatMessageCallback: any,
    pinMessageCallback: any,
    unpinMessageCallback: any
}


const ExpandableCard:FC <ExpandableCardProps> = (props) => {


    const [saveChanges, setSaveChanges] = useState(false)
    const saveChangesUpdate = (active: boolean) => {
        setSaveChanges(active)
    }

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [formText, setFormText] = useState('');
    const setFromatedText = (text: string) => {
        setFormText(text)
    }


    const updateMessageCallback = () => {
        props.updateMessageCallback(props.id, formText)
    }
    useEffect(() => {
        if(saveChanges) {
            setSaveChanges(false)
            updateMessageCallback()
        }
    }, [saveChanges])

    const mainContextMenuCallback = (option: string) => {
        switch (option) {
            case 'Удалить':
                if(window.confirm("Вы действительно хотите удалить рассылку? \nОтменить это будет невозможно")) {
                    props.deleteMessageCallback(props.id)
                } else {
                    break;
                }
                break;
            case 'Закрепить все':
                props.pinMessageCallback(props.id, 'all', '')
                break;
            case 'Открепить все':
                props.unpinMessageCallback(props.id, 'all', '')
                break;
            default:
                break;
        }
    }

    const chatsContextMenuCallback = (option: string, chat_id: string, message_id: string) => {
        switch (option) {
            case 'Удалить':
                if(window.confirm("Вы действительно хотите удалить рассылку из данного чата? \nОтменить это будет невозможно")) {
                    props.deleteChatMessageCallback(props.id, chat_id, message_id)
                } else {
                    break;
                }
                break;
            case 'Закрепить':
                props.pinMessageCallback(props.id, chat_id, '')
                break;
            case 'Открепить':
                props.unpinMessageCallback(props.id, chat_id, '')
                break;
            default:
                break;
        }
    }


    return (
        <Card sx={{ width: '100%', position: 'relative', margin: '25px 0', backgroundColor: '#fafafc'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '65px',
                    }}
                >
                    <MoreContexMenu
                        callbackFunc={mainContextMenuCallback}
                        options={['Удалить', 'Закрепить все', 'Открепить все']}
                    />
                </div>
                <CardContent>
                    <Typography>
                        <b>ID:</b> {props.id}
                    </Typography>
                    <Typography>
                        <b>Отправитель:</b> {props.author}
                    </Typography>
                    <Typography>
                        <b>Группа:</b> {props.groupName}
                    </Typography>
                    <Typography>
                        <b>Дата отправки:</b> {props.date}
                    </Typography>
                </CardContent>
            </div>
            <CardActions
                disableSpacing
                onClick={handleExpandClick}
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40px',
                    height: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#f3f3f3',
                    }
                }}
            >
                <ExpandMore
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '95%'
                    }}>
                        <Typography paragraph>Текст сообщения рассылки:</Typography>
                    </div>
                    <Textarea
                        width='95%'
                        onChange={setFromatedText}
                        initContent={props.messageText}
                        saveChanges={saveChangesUpdate}
                    />
                    {props.chatMessages.map((item) => {
                        let pinText = '';
                        let chatNameDecoration = '';
                        if(item.pinned == '0') {
                            chatNameDecoration = 'unset'
                            pinText = 'Закрепить'
                        } else {
                            chatNameDecoration = '#dedede'
                            pinText = 'Открепить'
                        }
                        if(item.chat_id == '0') {
                            return(
                                <div
                                    key='1234567890'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '95%'
                                    }}
                                >
                                    <p style={{
                                        margin: '0 25px 0 3px',
                                        width: '250px'
                                    }}><b>В данной рассылке нет чатов или они были все удалены</b></p>
                                </div>
                            )
                        }
                        return(
                            <div
                                key={item.chat_id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '95%'
                                }}
                            >

                                <p style={{
                                    margin: '0 25px 0 3px',
                                    width: 'auto',
                                    backgroundColor: chatNameDecoration
                                }}>{item.chat_name}</p>
                                <MoreContexMenu
                                    callbackFunc={chatsContextMenuCallback}
                                    options={['Удалить', pinText]}
                                    chat_id={item.chat_id}
                                    message_id={item.message_id}
                                />
                            </div>
                        )
                    }
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ExpandableCard;