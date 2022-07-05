import React, {FC} from 'react';
import "./NavItem.css";


interface NavItemProps {
    text: string
    type: string
    index: number
}

const NavItem:FC<NavItemProps> = (props) => {

    return (
        <div className={props.type + " nav_item"}>
            <p>{props.text}</p>
        </div>
    );
};

export default NavItem;