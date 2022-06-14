import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {FC, useEffect, useState} from "react";
import {IGroups} from "../../../models/IGroups";
import ClearIcon from '@mui/icons-material/Clear';

function not(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
    return [...a, ...not(b, a)];
}

interface TransferListProps {
    groups: IGroups
    update: any
}

interface chatsInitial {
    value: number[]
}

const TransferList:FC<TransferListProps> = (props) => {

    const [searchableListValueLeft, setSearchableListValueLeft] = useState('')
    const [searchableListValueRight, setSearchableListValueRight] = useState('')
    const searchableList = (value: string, list: string = 'left') => {
        if(list == 'left') {
            setSearchableListValueLeft(value)
        } else if (list == 'right') {
            setSearchableListValueRight(value)
        }
    }

    const group = props.groups
    const allChats = group.chats.concat(group.otherChats)


    const rightChats: chatsInitial = {
        value: []
    }
    const leftChats: chatsInitial = {
        value: []
    }
    if(typeof group.chats[0] != 'string') {
        leftChats.value = group.chats.map((chat, index) => {
            return index
        })
    }
    if(typeof group.otherChats[0] != 'string') {
        rightChats.value = group.otherChats.map((chat, index) => {
            return leftChats.value.length + index
        })
    }



    const [checked, setChecked] = React.useState<readonly number[]>([]);
    const [left, setLeft] = React.useState<readonly number[]>(leftChats.value);
    const [right, setRight] = React.useState<readonly number[]>(rightChats.value);

    useEffect(() => {
        const leftChats = left.map((chat) => {
            return allChats[chat].id
        })
        props.update(leftChats)
    }, [left])

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly number[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly number[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const searchInput = (list: string) => {
        let value
        if(list == 'left') {
            value = searchableListValueLeft
        } else {
            value = searchableListValueRight
        }

        return (
            <input
                style={{
                    width: '100%',
                    margin: '0',
                    padding: '16px',
                    boxSizing: 'border-box',
                    border: 'none',
                    outlineWidth: '1px'
                }}
                value={value}
                onInput={(e) => searchableList(e.currentTarget.value, list)}
                placeholder='Найти чат'
            />
        )
    }

    const customList = (title: React.ReactNode, items: readonly number[], list: string) => (
        <Card sx={{
            backgroundColor: "#efefef"
        }}>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <div
                style={{
                    position: 'relative'
                }}
            >
                {searchInput(list)}
                <ClearIcon
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '8px',
                        transform: 'translate(0, -50%)',
                        width: '24px',
                        height: '24px',
                        color: '#fe4565',
                        cursor: 'pointer'
                    }}
                    onClick={() => searchableList('', list)}
                />
            </div>

            <Divider />
            <List
                sx={{
                    width: 300,
                    height: 300,
                    bgcolor: '#fafafa',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: number) => {
                    const labelId = `transfer-list-all-item-${value}-label`

                    let allChatsValue2LowerString = allChats[value].name.toLowerCase()
                    let currentSearch2LowerString
                    if(list == 'left') {
                        currentSearch2LowerString = searchableListValueLeft.toLowerCase()
                    } else {
                        currentSearch2LowerString = searchableListValueRight.toLowerCase()
                    }

                    if(!allChatsValue2LowerString.includes(currentSearch2LowerString)) {
                        return false;
                    }

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={allChats[value].name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{
            margin: "15px 0"
        }}>
            <Grid item sx={{
                paddingRight: "8px"
            }}>
                {customList('Чаты в группе', left, 'left')}
            </Grid>
            <Grid item sx={{
                paddingRight: "8px"
            }}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item sx={{
                paddingRight: "8px"
            }}>
                {customList('Остальные чаты', right, 'right')}
            </Grid>
        </Grid>
    );
}

export default TransferList;