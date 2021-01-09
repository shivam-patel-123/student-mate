import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import slugify from 'react-slugify';
import { createStructuredSelector } from 'reselect';

import Navigation from '../../components/navigation/navigation.component';
import Home from '../../components/home/home.component';
import Header from '../../components/header/header.component';

import { getAllDepartmentStart } from '../../redux/admin/department/department.actions';
import { selectDepartmentNames } from '../../redux/admin/department/department.selectors';

import './admin-panel.styles.scss';

const AdminPanel = ({ getAllDepartmentStart, departments }) => {
    useEffect(() => {
        getAllDepartmentStart();
    }, []);

    const menuItems = departments.map((department) => {
        const slug = slugify(department.name);

        return {
            title: department.name,
            id: department.id,
            name: slug,
            route: `/admin/${slug}`,
        };
    });

    return (
        <div className='admin-panel'>
            <div className='dashboard__navigation'>
                <Navigation menuItems={menuItems} />
            </div>
            <div className='dashboard__header'>
                <Header />
            </div>
            <div className='dashboard__content'>
                <Switch>
                    <Route exact path='/admin/:slug' component={Home} />
                </Switch>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    departments: selectDepartmentNames,
});

const mapDispatchToProps = (dispatch) => ({
    getAllDepartmentStart: () => dispatch(getAllDepartmentStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
