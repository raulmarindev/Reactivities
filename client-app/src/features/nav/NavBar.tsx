import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface IProps {
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img alt="logo" src="/assets/logo.png" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={openCreateForm} />
                </Menu.Item>
            </Container>
        </Menu>);
};
