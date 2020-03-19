import { ActivityDetails } from './ActivityDetails';
import { ActivityList } from './ActivityList';
import { IActivity } from '../../../app/models/IActivity';
import { RootState } from '../../../store';
import { ActivityDashboardState } from '../../../store/activityDashboard';
import { ActivityForm } from '../form/ActivityForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';

interface IProps {
    createActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
    editActivity: (activity: IActivity) => void;
    selectActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({ createActivity, deleteActivity, editActivity, selectActivity }) => {
    const { editMode, selectedActivity } = useSelector<RootState, ActivityDashboardState>(({ activityDashboardReducer }) => activityDashboardReducer);

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList deleteActivity={deleteActivity} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails onCancel={() => { selectActivity(""); }} />}
                {editMode && <ActivityForm key={selectedActivity?.id || 0} activity={selectedActivity!} createActivity={createActivity}
                    editActivity={editActivity} />}
            </Grid.Column>
        </Grid>
    );
};
