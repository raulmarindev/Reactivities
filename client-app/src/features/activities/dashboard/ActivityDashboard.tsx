import { LoadingComponent } from 'app/layout/LoadingComponent';
import { ActivityList } from 'features/activities/dashboard/ActivityList';
import { Grid } from 'material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from 'store';
import { fetchActivities } from 'store/activityDashboard';

export const ActivityDashboard: React.FC = () => {
    const loading = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.isFetching);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchActivities());
    }, [dispatch]);

    if (loading) return (<LoadingComponent content="Loading activities..." />);
    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <ActivityList />
            </Grid>
            <Grid item xs={4}>
                <h2>Activity filters</h2>
            </Grid>
        </Grid>
    );
};
