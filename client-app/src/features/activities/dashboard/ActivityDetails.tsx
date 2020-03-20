import { IActivity } from 'app/models/IActivity';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react';
import { AppDispatch, useTypedSelector } from 'store';
import { selectActivity, setEditMode } from 'store/activityDashboard';

export const ActivityDetails: React.FC = () => {
    const activity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);
    const dispatch = useDispatch<AppDispatch>();

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
                    <Button basic color='grey' content='Cancel' onClick={() => { dispatch(selectActivity("")); }} />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
