import { IActivity } from 'app/models/IActivity';
import { ActivityDetails } from 'features/activities/dashboard/ActivityDetails';
import { ActivityList } from 'features/activities/dashboard/ActivityList';
import { ActivityForm } from 'features/activities/form/ActivityForm';
import { Grid } from 'material';
import React from 'react';
import { useTypedSelector } from 'store';

export const ActivityDashboard: React.FC = () => {
    const editMode = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.editMode);
    const selectedActivity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);

    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <ActivityList />
            </Grid>
            <Grid item xs={4}>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm key={selectedActivity?.id || 0} />}
            </Grid>
        </Grid>
    );
};
