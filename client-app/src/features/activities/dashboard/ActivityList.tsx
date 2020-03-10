import { IActivity } from '../../../app/models/IActivity';
import React from 'react';
import {
    Button,
    Item,
    Label,
    Segment
    } from 'semantic-ui-react';

interface IProps {
    activities: IActivity[];
    deleteActivity: (id: string) => void;
    selectActivity: (id: string) => void;
    selectedActivityId?: string;
    submitting: boolean;
}

export const ActivityList: React.FC<IProps> = ({ activities, deleteActivity, selectActivity, selectedActivityId, submitting }) => {
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
                                <Button floated='right' content='Delete' color='red' onClick={() => { deleteActivity(activity.id); }} loading={submitting && activity.id === selectedActivityId} />
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
