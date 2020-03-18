import { RootState } from '../../../store';
import { ActivityDashboardState } from '../../../store/activityDashboard';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Item,
    Label,
    Segment
    } from 'semantic-ui-react';

interface IProps {
    deleteActivity: (id: string) => void;
    selectActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({ deleteActivity, selectActivity }) => {
    const { activities, isSubmitting, selectedActivity } = useSelector<RootState, ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);

    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => { selectActivity(activity.id); }} />
                                <Button floated='right' content='Delete' color='red' onClick={() => { deleteActivity(activity.id); }} loading={isSubmitting && activity.id === selectedActivity?.id} />
                                <Label basic content='category' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>
    );
};
