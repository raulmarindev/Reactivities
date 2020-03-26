import { LoadingComponent } from 'app/layout/LoadingComponent';
import { IActivity } from 'app/models/IActivity';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
    } from 'material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from 'store';
import { fetchActivityById, selectActivity, setEditMode } from 'store/activityDashboard';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        minHeight: 250,
    },
    button: {
        width: '50%'
    }
});

export const ActivityDetails: React.FC = () => {
    const classes = useStyles();
    const activity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);
    const loading = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchActivityById("403d8a28-0711-42cb-a74d-e6d3805ea536"));
    }, [dispatch]);

    if (loading) return (<LoadingComponent content="Loading activities..." />);

    return (
        <Card>
            {/* <CardHeader title={activity?.title} subheader={activity?.date} /> */}
            <CardMedia className={classes.media} image={`/assets/categoryImages/${activity?.category}.jpg`} title={activity?.title} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {activity?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {activity?.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.button} variant="outlined" size="large" color="primary" onClick={() => { dispatch(setEditMode(true)); }}> Edit </Button>
                <Button className={classes.button} variant="outlined" size="large" color="default" onClick={() => { dispatch(selectActivity("")); }}> Cancel </Button>
            </CardActions>
        </Card>
    );
};
