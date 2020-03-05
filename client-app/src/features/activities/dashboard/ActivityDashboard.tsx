import { ActivityList } from './ActivityList';
import { ActivityDetails } from './details/ActivityDetails';
import { IActivity } from '../../../app/models/IActivity';
import { ActivityForm } from '../form/ActivityForm';
import React from 'react';
import { Grid } from 'semantic-ui-react';

interface IProps {
    activities: IActivity[];
    editMode: boolean;
    setEditMode: (active: boolean) => void;
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
}

export const ActivityDashboard: React.FC<IProps> = ({ activities, editMode, selectActivity, selectedActivity, setEditMode }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} onCancel={() => { selectActivity(""); }} setEditMode={setEditMode} />}
                {editMode && <ActivityForm activity={selectedActivity!} setEditMode={setEditMode} />}
            </Grid.Column>
        </Grid>
    );
};
