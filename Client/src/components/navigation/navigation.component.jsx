import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../Assets/Logo.svg';

import MenuItem from '../menu-item/menu-item.component';

import './navigation.styles.scss';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: [
                {
                    id: 1,
                    name: 'home',
                    title: 'Home',
                    route: '/dashboard',
                },
                {
                    id: 2,
                    name: 'all-subjects',
                    title: 'All Subjects',
                    route: '/dashboard/subjects',
                },
                {
                    id: 3,
                    name: 'chats',
                    title: 'Chats',
                    route: '/dashboard/chats',
                },
                {
                    id: 4,
                    name: 'notice-board',
                    title: 'Notice Board',
                    route: '/dashboard/notice',
                },
            ],
        };
    }

    render() {
        const { menuItems } = this.state;
        return (
            <div className='navigation'>
                <div className='navigation__logo'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <div className='navigation__content'>
                    <ul className='menu-items'>
                        {menuItems.map(({ id, ...props }) => (
                            <MenuItem key={id} {...props} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Navigation;
