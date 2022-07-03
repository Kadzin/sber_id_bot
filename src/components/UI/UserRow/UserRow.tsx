import React, {FC} from 'react';
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import "./UserRow.css";

interface userProps {
    id: string,
    name: string,
    role: string,
    badge?: string
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    if(name.split(' ')[1] != undefined) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    } else {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.substring(0, 2)}`,
        };
    }

}


const UserRow:FC<userProps> = (props) => {

    const ITEM_HEIGHT = 48;
    const [menuAnchorEl, setmenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setmenuAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setmenuAnchorEl(null);
    };



    return (
        <div className="container">
            <div className="left_content">
                <Avatar {...stringAvatar(props.name)}/>
                <p className="user_cell">{props.name}</p>
                <p className="user_cell">{props.id}</p>
                <p className="user_cell">{props.role}</p>
            </div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickMenu}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={menuAnchorEl}
                open={open}
                onClose={handleCloseMenu}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem>Редактировать</MenuItem>
                <MenuItem>Удалить</MenuItem>
            </Menu>
        </div>
    );
};

export default UserRow;