import React, {FC} from 'react';
import "./NavItem.css";


interface NavItemProps {
    text: string
    type: string
    page: string
    callback?: any
}

const NavItem:FC<NavItemProps> = (props) => {

    const page = props.page;

    const togglePage = (e:React.MouseEvent) => {
        props.callback(page);
    }

    return (
        <div onClick={togglePage} className="nav_item">
            <p className={props.type}>{props.text}</p>
        </div>
    );
};

export default NavItem;