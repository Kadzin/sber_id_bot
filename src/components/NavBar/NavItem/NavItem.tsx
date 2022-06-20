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
        <div onClick={togglePage} className={props.type + " nav_item"}>
            <p>{props.text}</p>
        </div>
    );
};

export default NavItem;