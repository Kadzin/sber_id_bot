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
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

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
    updateMessageCallback: any,
    deleteMessageCallback: any,
    deleteChatMessageCallback: any
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

    const deleteMessage = () => {
        props.deleteMessageCallback(props.id)
    }
    const deleteChatMessage = (chat_id: string, message_id: string) => {
        props.deleteChatMessageCallback(props.id, chat_id, message_id)
    }

    return (
        <Card sx={{ width: '100%', position: 'relative', margin: '25px 0', backgroundColor: '#fafafc'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <CardContent>
                    <Typography>
                        ID: {props.id}
                    </Typography>
                    <Typography>
                        Группа: {props.groupName}
                    </Typography>
                    <Typography>
                        Дата отправки: {props.date}
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
                        <div style={{

                        }}>
                            <PushPinIcon sx={{
                                color: '#0048ff'
                            }} />
                            <DoDisturbIcon
                                sx={{
                                    color: '#ff0000',
                                    cursor: 'pointer'
                                }}
                                onClick={deleteMessage}
                            />
                        </div>
                    </div>
                    <Textarea width='95%' onChange={setFromatedText} initContent={props.messageText} saveChanges={saveChangesUpdate} />
                    {props.chatMessages.map((item) => {
                        let pinColor = '';
                        if(item.pinned == '0') {
                            pinColor = '#dedede'
                        } else {
                            pinColor = '#0048ff'
                        }
                        if(item.chat_id == '0') {
                            return(
                                <div
                                    key='1234567890'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
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
                                    alignItems: 'baseline',
                                    width: '95%'
                                }}
                            >
                                <p style={{
                                    margin: '0 25px 0 3px',
                                    width: '250px'
                                }}>{item.chat_name}</p>
                                <PushPinIcon sx={{
                                    color: pinColor,
                                    margin: '0 10px',
                                    cursor: 'pointer'
                                }} />
                                <DoDisturbIcon
                                    sx={{
                                        color: '#ff0000',
                                        margin: '0 10px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => deleteChatMessage(item.chat_id, item.message_id)}
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