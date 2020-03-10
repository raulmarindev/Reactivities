import { ActivityList } from './ActivityList';
import { ActivityDetails } from './details/ActivityDetails';
import { IActivity } from '../../../app/models/IActivity';
import { ActivityForm } from '../form/ActivityForm';
import React from 'react';
import { Grid } from 'semantic-ui-react';

interface IProps {
    activities: IActivity[];
    createActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
    editActivity: (activity: IActivity) => void;
    editMode: boolean;
    setEditMode: (active: boolean) => void;
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    submitting: boolean;
}

export const ActivityDashboard: React.FC<IProps> = ({ activities, createActivity, deleteActivity, editActivity, editMode, selectActivity, selectedActivity, setEditMode, submitting }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} deleteActivity={deleteActivity} selectActivity={selectActivity} selectedActivityId={selectedActivity?.id} submitting={submitting} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} onCancel={() => { selectActivity(""); }} setEditMode={setEditMode} />}
                {editMode && <ActivityForm key={selectedActivity?.id || 0} activity={selectedActivity!} createActivity={createActivity}
                    editActivity={editActivity} setEditMode={setEditMode} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    );
};
