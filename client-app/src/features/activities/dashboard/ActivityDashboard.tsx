import { IActivity } from 'app/models/IActivity';
import { ActivityDetails } from 'features/activities/dashboard/ActivityDetails';
import { ActivityList } from 'features/activities/dashboard/ActivityList';
import { ActivityForm } from 'features/activities/form/ActivityForm';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useTypedSelector } from 'store';

export const ActivityDashboard: React.FC = () => {
    const editMode = useTypedSelector<boolean>(({ activityDashboardReducer }) => activityDashboardReducer.editMode);
    const selectedActivity = useTypedSelector<IActivity | undefined>(({ activityDashboardReducer }) => activityDashboardReducer.selectedActivity);

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm key={selectedActivity?.id || 0} />}
            </Grid.Column>
        </Grid>
    );
};
