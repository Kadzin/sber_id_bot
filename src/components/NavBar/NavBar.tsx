import React, {FC, useEffect, useState} from 'react';
import NavItem from "./NavItem/NavItem";
import {Link, useLocation} from "react-router-dom";
import './NavBar.css'

interface NavBarInterface {
    role: string
}

const NavBar:FC<NavBarInterface> = (props) => {

    const [pages, setPages] = useState([
        {
            linkTo: '/send',
            text: 'Отправить сообщение',
            active: 'active',
            hide: false
        },
        {
            linkTo: '/groups',
            text: 'Группы и Чаты',
            active: '',
            hide: false
        },
        {
            linkTo: '/users',
            text: 'Пользователи',
            active: '',
            hide: false
        },
        {
            linkTo: '/messages',
            text: 'Сообщения',
            active: '',
            hide: false
        },
    ])

    if(props.role == 'user') {
        pages[2].hide = true
    } else {
        pages[2].hide = false
    }

    let location = useLocation()


    useEffect(() => {
        let newPages = [...pages]
        for(let i = 0; i < newPages.length; i++) {
            if(newPages[i].linkTo == location.pathname) {
                newPages[i].active = 'active'
            } else {
                newPages[i].active = ''
            }
        }
        setPages(newPages)
    }, [location])


    return (
        <div className="nav_bar">
            {pages && pages.map((item, index) => {
                if(!item.hide) {
                    return (
                        <Link key={item.linkTo} to={item.linkTo}>
                            <NavItem type={item.active} text={item.text} index={index} />
                        </Link>
                    )
                }
            }
            )}
        </div>
    )
};

export default NavBar;