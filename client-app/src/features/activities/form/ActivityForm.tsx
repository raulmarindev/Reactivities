import { LoadingComponent } from 'app/layout/LoadingComponent';
import { IActivity } from 'app/models/IActivity';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    makeStyles,
    TextField,
    Typography
    } from 'material';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Routes, routesKeys } from 'routes';
import { AppDispatch, useTypedSelector } from 'store';
import {
    createActivity,
    fetchActivityById,
    selectActivity,
    updateActivity
    } from 'store/activityDashboard';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
        },
    },
    cardActions: {
        flexDirection: "row-reverse"
    }
}));

interface ActivityFormParams {
    id?: string;
}
export const ActivityForm: React.FC<RouteComponentProps<ActivityFormParams>> = ({ history, match }) => {
    const dispatch = useDispatch<AppDispatch>();

    const isSubmitting = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isSubmitting);
    const selectedActivity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);
    const classes = useStyles();
    const loading = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

    useEffect(() => {
        if (match.params.id) {
            dispatch(fetchActivityById(match.params.id));
        }

        return () => {
            dispatch(selectActivity(""));
        };
    }, [dispatch, match.params.id]);


    const [activity, setActivity] = useState<IActivity>({
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
    });

    useEffect(() => {
        if (match.params.id && selectedActivity) {
            setActivity(selectedActivity);
        }
    }, [selectedActivity, match.params.id]);

    if (loading) return (<LoadingComponent content="Loading activity..." />);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;

        setActivity({ ...activity, [name]: value });
    };

    const goToActivityDetails = (activityId: string) => {
        history.push(activityDetailsRoute.path.replace(':id', activityId));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (match.params.id && selectedActivity) {
            dispatch(updateActivity(activity)).then(() => goToActivityDetails(match.params.id!));
        }
        else {
            const newActivityId = uuid();
            dispatch(createActivity({
                ...activity,
                id: newActivityId
            })).then(() => {
                console.log(`activity id: ${activity.id}`);
                goToActivityDetails(newActivityId);
            });
        }
    };

    const activitiesRoute = Routes.get(routesKeys.ActivitiesList)!;
    const activityDetailsRoute = Routes.get(routesKeys.ActivityDetails)!;

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Card className={classes.root}>
                <CardContent>
                    <TextField name='title' label="Title" value={activity.title} onChange={handleInputChange} fullWidth />
                    <TextField name='description' label="Description" value={activity.description} onChange={handleInputChange} multiline rows="2" fullWidth />
                    <TextField name='category' label="Category" value={activity.category} onChange={handleInputChange} fullWidth />
                    <TextField name='date' label="Date" value={activity.date} onChange={handleInputChange} type='datetime-local' fullWidth InputLabelProps={{ shrink: true, }} />
                    <TextField name='city' label="City" value={activity.city} onChange={handleInputChange} fullWidth />
                    <TextField name='venue' label="Venue" value={activity.venue} onChange={handleInputChange} fullWidth />
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button variant="contained" size="small" color="primary" type="submit">
                        {isSubmitting ?
                            <CircularProgress size={24} /> : // Size 14 works pretty well
                            <Typography>Submit</Typography>}
                    </Button>
                    <Button variant="contained" size="small" color="default" onClick={() => {
                        if (match.params.id)
                            goToActivityDetails(match.params.id);
                        else
                            history.push(activitiesRoute.path);
                    }}><Typography>Cancel</Typography></Button>
                </CardActions>
            </Card>
        </form>
    );
};
