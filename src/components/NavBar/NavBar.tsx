import React, {useEffect, useState} from 'react';
import NavItem from "./NavItem/NavItem";
import {Link, useLocation} from "react-router-dom";



const NavBar = () => {

    const [active, setActive] = useState({
        page_1: 'active',
        page_2: '',
        page_3: ''
    })
    let location = useLocation()

    useEffect(() => {
        handleClick(location.pathname)
    }, [location])

    function handleClick(page: string) {

        switch (page) {
            case '/send':
                setActive({
                    page_1: 'active',
                    page_2: '',
                    page_3: ''
                })
                break;
            case '/groups':
                setActive({
                    page_1: '',
                    page_2: 'active',
                    page_3: ''
                })
                break;
            case '/users':
                setActive({
                    page_1: '',
                    page_2: '',
                    page_3: 'active'
                })
                break;
            default:
                setActive({
                    page_1: 'active',
                    page_2: '',
                    page_3: ''
                })
                break;
        }
    }

    return (
            <div className="nav_bar">
                <Link to={"/send"}>
                    <NavItem callback={handleClick} page="/send" type={active.page_1} text="Отправить сообщение"/>
                </Link>
                <Link to={"/groups"}>
                    <NavItem callback={handleClick} page="/groups" type={active.page_2} text="Группы и Чаты"/>
                </Link>
                <Link to={"/users"}>
                    <NavItem callback={handleClick} page="/users" type={active.page_3} text="Пользователи"/>
                </Link>
            </div>
    );
};

export default NavBar;