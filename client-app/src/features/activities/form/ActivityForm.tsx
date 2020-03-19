import { IActivity } from '../../../app/models/IActivity';
import { RootState } from '../../../store';
import { ActivityDashboardState, setEditMode } from '../../../store/activityDashboard';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

interface IProps {
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({ activity: initialActivity, createActivity, editActivity }) => {
    const { isSubmitting } = useSelector<RootState, ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

    const initializeForm = () => {
        if (initialActivity) {
            return initialActivity;
        } else {

            return {
                id: "",
                title: "",
                description: "",
                category: "",
                date: "",
                city: "",
                venue: "",
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;

        setActivity({ ...activity, [name]: value });
    };

    const handleSubmit = () => {
        if (initialActivity) {
            editActivity(activity);
        }
        else {
            createActivity({
                ...activity,
                id: uuid()
            });
        }
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input value={activity.title} name='title' placeholder='Title' onChange={handleInputChange} />
                <Form.TextArea name='description' value={activity.description} rows={2} placeholder='Description' onChange={handleInputChange} />
                <Form.Input name='category' value={activity.category} placeholder='Category' onChange={handleInputChange} />
                <Form.Input name='date' value={activity.date} placeholder='Date' type='datetime-local' onChange={handleInputChange} />
                <Form.Input name='city' value={activity.city} placeholder='City' onChange={handleInputChange} />
                <Form.Input name='venue' value={activity.venue} placeholder='Venue' onChange={handleInputChange} />
                <Button floated="right" positive type="submit" content="Submit" loading={isSubmitting} />
                <Button floated="right" type="button" content="Cancel" onClick={() => { dispatch(setEditMode(false)); }} />
            </Form>
        </Segment>
    );
};
