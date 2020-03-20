import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Menu } from 'semantic-ui-react';
import { AppDispatch } from 'store';
import { openCreateForm } from 'store/activityDashboard';

export const NavBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img alt="logo" src="/assets/logo.png" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={dispatch(openCreateForm)} />
                </Menu.Item>
            </Container>
        </Menu>);
};
