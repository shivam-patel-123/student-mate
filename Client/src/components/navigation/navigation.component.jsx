import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../Assets/Logo.svg';

import MenuItem from '../menu-item/menu-item.component';

import './navigation.styles.scss';

class Navigation extends React.Component {
    render() {
        const { menuItems } = this.props;
        return (
            <div className='navigation'>
                <div className='navigation__logo'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <div className='navigation__content'>
                    <div className='menu-items'>
                        {menuItems.map(({ id, ...props }) => (
                            <MenuItem key={id} {...props} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default Navigation;
