import { IActivity } from 'app/models/IActivity';
import {
    Button,
    CircularProgress,
    Container,
    makeStyles,
    TextField,
    Typography
    } from 'material';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from 'store';
import { createActivity, setEditMode, updateActivity } from 'store/activityDashboard';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        float: "right"
    }
}));

export const ActivityForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isSubmitting = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isSubmitting);
    const selectedActivity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);
    const classes = useStyles();

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
        <Container>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField name='title' label="Title" value={activity.title} onChange={handleInputChange} fullWidth />
                <TextField name='description' label="Description" value={activity.description} onChange={handleInputChange} multiline rows="2" fullWidth />
                <TextField name='category' label="Category" value={activity.category} onChange={handleInputChange} fullWidth />
                <TextField name='date' label="Date" value={activity.date} onChange={handleInputChange} type='date' fullWidth InputLabelProps={{ shrink: true, }} />
                <TextField name='city' label="City" value={activity.city} onChange={handleInputChange} fullWidth />
                <TextField name='venue' label="Venue" value={activity.venue} onChange={handleInputChange} fullWidth />
                <Button variant="contained" size="small" color="primary" className={classes.button} type="submit">
                    {isSubmitting ?
                        <CircularProgress size={20} /> : // Size 14 works pretty well
                        <Typography>Submit</Typography>}
                </Button>
                <Button variant="contained" size="small" color="default" onClick={() => { dispatch(setEditMode(false)); }} className={classes.button}>
                    <Typography>Cancel</Typography>
                </Button>
            </form>
        </Container>
    );
};
