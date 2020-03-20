import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Item,
    Label,
    Segment
    } from 'semantic-ui-react';
import { AppDispatch, useTypedSelector } from 'store';
import { ActivityDashboardState, getActivitiesByDate } from 'store/activityDashboard';
import { deleteActivity, selectActivity } from 'store/activityDashboard';

export const ActivityList: React.FC = () => {
    const state = useTypedSelector<ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);
    const {isSubmitting, selectedActivity} = state;
    const activities = getActivitiesByDate(state);
    const dispatch = useDispatch<AppDispatch>();

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
                                <Button floated='right' content='View' color='blue' onClick={() => { dispatch(selectActivity(activity.id)); }} />
                                <Button floated='right' content='Delete' color='red' onClick={() => { dispatch(deleteActivity(activity.id)); }} loading={isSubmitting && activity.id === selectedActivity?.id} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>
    );
};
