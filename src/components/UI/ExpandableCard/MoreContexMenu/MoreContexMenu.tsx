import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface props {
    callbackFunc: any,
    options: any[],
    chat_id?: string,
    message_id?: string
}

const MoreContexMenu:FC<props> = (props) => {

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
        <>
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
                {props.options.map((option) => (
                    <MenuItem key={option} onClick={() => {
                        handleCloseMenu()
                        props.callbackFunc(option, props?.chat_id, props?.message_id)
                    }}>
                        {option}
                    </MenuItem>
                ))}

            </Menu>
        </>
    );
};

export default MoreContexMenu;