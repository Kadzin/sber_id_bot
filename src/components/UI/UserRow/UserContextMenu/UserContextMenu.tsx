import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface userContextMenuProps {
    setUpdateUserID: any,
    setUpdateUserRole: any,
    showEditModal: any,
    deleteUser: any,
    id: string,
    role: string
}

const UserContextMenu:FC<userContextMenuProps> = (props) => {

    const ITEM_HEIGHT = 48;
    const [menuAnchorEl, setmenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setmenuAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setmenuAnchorEl(null);
    };

    const editUser = () => {
        handleCloseMenu()
        props.setUpdateUserID(props.id)
        props.setUpdateUserRole(props.role)
        props.showEditModal()
    }

    const deleteUser = () => {
        handleCloseMenu()
        props.deleteUser()
    }

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
                <MenuItem onClick={editUser}>Редактировать</MenuItem>
                <MenuItem onClick={deleteUser}>Удалить</MenuItem>
            </Menu>
        </>
    );
};

export default UserContextMenu;