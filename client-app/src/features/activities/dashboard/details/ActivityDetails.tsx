import { IActivity } from '../../../../app/models/IActivity';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

interface IProps {
    activity: IActivity;
    onCancel: () => void;
    setEditMode: (enabled: boolean) => void;
}

export const ActivityDetails: React.FC<IProps> = ({ activity, onCancel, setEditMode }) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={() => { setEditMode(true); }} />
                    <Button basic color='grey' content='Cancel' onClick={() => { onCancel(); }} />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
