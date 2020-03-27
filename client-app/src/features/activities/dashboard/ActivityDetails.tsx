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
import { Link, RouteComponentProps } from 'react-router-dom';
import { Routes, routesKeys } from 'routes';
import { AppDispatch, useTypedSelector } from 'store';
import { fetchActivityById } from 'store/activityDashboard';

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

interface ActivityDetailsParams {
    id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<ActivityDetailsParams>> = ({ history, match }) => {
    const classes = useStyles();
    const activity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);
    const loading = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchActivityById(match.params.id));
    }, [dispatch, match.params.id]);

    if (loading) return (<LoadingComponent content="Loading activities..." />);

    const activitiesRoute = Routes.get(routesKeys.ActivitiesList)!;

    return (
        <>
            <h1>Activity Details</h1>
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
                    <Button className={classes.button} variant="contained" size="small" color="primary" component={Link} to={`/activities/edit/${activity?.id}`}> Edit </Button>
                    <Button className={classes.button} variant="contained" size="small" color="default" onClick={() => { history.push(activitiesRoute.path); }}> Cancel </Button>
                </CardActions>
            </Card>
        </>
    );
};
