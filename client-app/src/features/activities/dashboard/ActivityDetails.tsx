import { RootState } from '../../../store';
import { ActivityDashboardState, setEditMode } from '../../../store/activityDashboard';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Button, Card, Image } from 'semantic-ui-react';

interface IProps {
    onCancel: () => void;
}

export const ActivityDetails: React.FC<IProps> = ({ onCancel }) => {
    const { selectedActivity: activity } = useSelector<RootState, ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={() => { dispatch(setEditMode(true)); }} />
                    <Button basic color='grey' content='Cancel' onClick={() => { onCancel(); }} />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
