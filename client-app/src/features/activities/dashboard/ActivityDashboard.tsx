import { ActivityList } from 'features/activities/dashboard/ActivityList';
import { Grid } from 'material';
import React from 'react';

export const ActivityDashboard: React.FC = () => {
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
