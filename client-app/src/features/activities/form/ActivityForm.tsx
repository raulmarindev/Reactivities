import { IActivity } from 'app/models/IActivity';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { AppDispatch, useTypedSelector } from 'store';
import { createActivity, setEditMode, updateActivity } from 'store/activityDashboard';
import { v4 as uuid } from 'uuid';

export const ActivityForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isSubmitting = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isSubmitting);
    const selectedActivity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);

    const initializeForm = () => {
        if (selectedActivity) {
            return selectedActivity;
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
        if (selectedActivity) {
            dispatch(updateActivity(activity));
        }
        else {
            dispatch(createActivity({
                ...activity,
                id: uuid()
            }));
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
