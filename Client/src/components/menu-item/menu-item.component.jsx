import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ReactComponent as Home } from '../../Assets/Home.svg';
import { ReactComponent as Subjects } from '../../Assets/Subjects.svg';
import { ReactComponent as Chats } from '../../Assets/Chats.svg';
import { ReactComponent as NoticeBoard } from '../../Assets/NoticeBoard.svg';

import './menu-item.styles.scss';

const MenuItem = ({ title, route, location, icon }) => {
    const active = route === location.pathname;
    return (
        <div className={`${active ? 'active' : ''} item`}>
            <Link to={route}>
                {icon === 'home' ? <Home className='icon' /> : null}
                {icon === 'subjects' ? <Subjects className='icon' /> : null}
                {icon === 'chats' ? <Chats className='icon' /> : null}
                {icon === 'noticeBoard' ? <NoticeBoard className='icon' /> : null}
                <span>{title}</span>
            </Link>
        </div>
    );
};

export default withRouter(MenuItem);
